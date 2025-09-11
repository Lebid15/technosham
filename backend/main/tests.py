from django.test import TestCase, Client

class ApiTests(TestCase):
    def setUp(self):
        self.c = Client()

    def test_menu_default(self):
        r = self.c.get('/api/menu')
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn('menu', data)
        self.assertIn('labels', data)

    def test_settings_set(self):
        r = self.c.post('/api/settings', data='{"theme":"dark","lang":"ar"}', content_type='application/json')
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()['theme'], 'dark')
        self.assertEqual(r.json()['lang'], 'ar')
