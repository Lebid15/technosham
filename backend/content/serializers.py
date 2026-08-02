from rest_framework import serializers

from .models import (
    ContactMessage,
    ProcessStep,
    Project,
    Service,
    SiteSettings,
    Stat,
    Testimonial,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        exclude = ["id"]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    tag_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    initial = serializers.ReadOnlyField()

    class Meta:
        model = Testimonial
        fields = "__all__"


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
        read_only_fields = ["is_read", "created_at"]
