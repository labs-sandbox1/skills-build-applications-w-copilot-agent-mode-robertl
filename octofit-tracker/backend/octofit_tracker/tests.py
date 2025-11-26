from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team', description='A team for testing')
        self.user = User.objects.create(name='Test User', email='testuser@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='Workout desc', difficulty='Easy')
        self.activity = Activity.objects.create(user=self.user, type='Test', duration=10, calories=100, date='2025-11-26')
        self.leaderboard = Leaderboard.objects.create(team=self.team, points=100)

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.team.name, 'Test Team')

    def test_activity_creation(self):
        self.assertEqual(self.activity.type, 'Test')
        self.assertEqual(self.activity.user.email, 'testuser@example.com')

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.points, 100)
        self.assertEqual(self.leaderboard.team.name, 'Test Team')
