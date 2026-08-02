from django.db.models import Sum
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response

from .models import ExternalSite, MetricSnapshot
from .serializers import (
    ExternalSiteSerializer,
    IngestSerializer,
    MetricSnapshotSerializer,
)


class ExternalSiteViewSet(viewsets.ModelViewSet):
    """إدارة المواقع المرتبطة — للمشرف فقط."""

    queryset = ExternalSite.objects.all()
    serializer_class = ExternalSiteSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=["get"])
    def metrics(self, request, pk=None):
        """تاريخ اللقطات لموقع معيّن (أحدث 100)."""
        site = self.get_object()
        qs = site.snapshots.all()[:100]
        return Response(MetricSnapshotSerializer(qs, many=True).data)

    @action(detail=True, methods=["post"])
    def rotate_key(self, request, pk=None):
        site = self.get_object()
        site.rotate_key()
        return Response({"api_key": site.api_key})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def overview(request):
    """ملخّص موحّد لكل المواقع المرتبطة — يظهر أعلى لوحة التحكم."""
    sites = ExternalSite.objects.filter(is_active=True)
    latest_snapshots = [s.latest for s in sites if s.latest]

    totals = {
        "visitors": sum(m.visitors for m in latest_snapshots),
        "orders": sum(m.orders for m in latest_snapshots),
        "new_users": sum(m.new_users for m in latest_snapshots),
        "revenue": float(sum(m.revenue for m in latest_snapshots)),
        "sites_total": sites.count(),
        "sites_up": sum(1 for m in latest_snapshots if m.status == "up"),
    }

    return Response(
        {
            "totals": totals,
            "sites": ExternalSiteSerializer(sites, many=True).data,
        }
    )


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def ingest(request):
    """API عام يستقبل إحصائيات من مواقعك الأخرى.

    يُرسل الموقع الخارجي ترويسة: X-Api-Key: <مفتاح الموقع>
    مع حمولة JSON بالإحصائيات.
    """
    api_key = request.headers.get("X-Api-Key") or request.data.get("api_key")
    if not api_key:
        return Response(
            {"detail": "مفتاح API مفقود (X-Api-Key)."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    try:
        site = ExternalSite.objects.get(api_key=api_key, is_active=True)
    except ExternalSite.DoesNotExist:
        return Response(
            {"detail": "مفتاح API غير صالح."}, status=status.HTTP_403_FORBIDDEN
        )

    serializer = IngestSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    snapshot = MetricSnapshot.objects.create(site=site, **serializer.validated_data)
    return Response(
        MetricSnapshotSerializer(snapshot).data, status=status.HTTP_201_CREATED
    )
