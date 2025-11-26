from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clean up collections using pymongo to avoid unhashable model error
        client = MongoClient('mongodb://localhost:27017')
        db = client.octofit_db
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.workouts.delete_many({})
        db.leaderboard.delete_many({})

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User(name='Batman', email='batman@dc.com', team=dc),
        ]
        for user in users:
            user.save()

        # Create workouts
        workouts = [
            Workout(name='Cardio Blast', description='High intensity cardio', difficulty='Hard'),
            Workout(name='Strength Training', description='Build muscle', difficulty='Medium'),
        ]
        for workout in workouts:
            workout.save()

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30, calories=300, date=timezone.now())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, calories=400, date=timezone.now())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, calories=500, date=timezone.now())
        Activity.objects.create(user=users[3], type='Yoga', duration=50, calories=200, date=timezone.now())

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=700)
        Leaderboard.objects.create(team=dc, points=700)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
