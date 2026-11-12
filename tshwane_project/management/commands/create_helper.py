from django.contrib.auth.models import Group, User
from django.core.management.base import BaseCommand, CommandError

from buses.permissions import HELPER_GROUP


class Command(BaseCommand):
    help = "Create (or reset the password of) a Helper account: python manage.py create_helper <username> <password>"

    def add_arguments(self, parser):
        parser.add_argument("username")
        parser.add_argument("password")

    def handle(self, *args, username, password, **opts):
        if len(password) < 8:
            raise CommandError("Password must be at least 8 characters.")
        group, _ = Group.objects.get_or_create(name=HELPER_GROUP)
        user, created = User.objects.get_or_create(username=username)
        user.set_password(password)
        user.save()
        user.groups.add(group)
        self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Updated'} helper '{username}'"))
