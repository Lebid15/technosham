from rest_framework import serializers

from .models import ExternalSite, MetricSnapshot


class MetricSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricSnapshot
        fields = "__all__"
        read_only_fields = ["site"]


class ExternalSiteSerializer(serializers.ModelSerializer):
    latest = MetricSnapshotSerializer(read_only=True)

    class Meta:
        model = ExternalSite
        fields = [
            "id", "name", "url", "site_type", "color",
            "api_key", "is_active", "created_at", "latest",
        ]
        read_only_fields = ["api_key", "created_at"]


class IngestSerializer(serializers.Serializer):
    """حمولة يرسلها الموقع الخارجي إلى /api/ingest/."""

    visitors = serializers.IntegerField(required=False, min_value=0, default=0)
    sessions = serializers.IntegerField(required=False, min_value=0, default=0)
    new_users = serializers.IntegerField(required=False, min_value=0, default=0)
    orders = serializers.IntegerField(required=False, min_value=0, default=0)
    revenue = serializers.DecimalField(required=False, max_digits=12, decimal_places=2, default=0)
    status = serializers.ChoiceField(choices=["up", "down", "degraded"], default="up")
    response_ms = serializers.IntegerField(required=False, min_value=0, default=0)
