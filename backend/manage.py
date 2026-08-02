#!/usr/bin/env python
"""أداة إدارة Django لمشروع تكنو شام."""
import os
import sys


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "تعذّر استيراد Django. تأكّد من تثبيته وتفعيل البيئة الافتراضية."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
