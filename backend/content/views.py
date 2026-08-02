from rest_framework import mixins, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import (
    ContactMessage,
    ProcessStep,
    Project,
    Service,
    SiteSettings,
    Stat,
    Testimonial,
)
from .serializers import (
    ContactMessageSerializer,
    ProcessStepSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SiteSettingsSerializer,
    StatSerializer,
    TestimonialSerializer,
)


class SiteSettingsViewSet(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """قراءة عامة + تعديل للمشرف فقط. سجلّ واحد دائماً (pk=1)."""

    serializer_class = SiteSettingsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        SiteSettings.load()
        return SiteSettings.objects.all()

    def get_object(self):
        return SiteSettings.load()

    def list(self, request, *args, **kwargs):
        # نُرجع دائماً السجلّ المفرد لتسهيل الاستهلاك في الواجهة.
        return Response(self.get_serializer(SiteSettings.load()).data)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ProcessStepViewSet(viewsets.ModelViewSet):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """إنشاء عام (نموذج التواصل)، وقراءة/إدارة للمشرف فقط."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def public_bootstrap(request):
    """كل ما تحتاجه الواجهة العامة في طلب واحد."""
    return Response(
        {
            "settings": SiteSettingsSerializer(SiteSettings.load()).data,
            "services": ServiceSerializer(
                Service.objects.filter(is_active=True), many=True
            ).data,
            "process": ProcessStepSerializer(ProcessStep.objects.all(), many=True).data,
            "projects": ProjectSerializer(
                Project.objects.filter(is_active=True), many=True
            ).data,
            "testimonials": TestimonialSerializer(
                Testimonial.objects.filter(is_active=True), many=True
            ).data,
            "stats": StatSerializer(Stat.objects.all(), many=True).data,
        }
    )
