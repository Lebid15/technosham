from django.shortcuts import render


def home(request):
	return render(request, 'core/home.html')


def services(request):
	return render(request, 'core/services.html')


def products(request):
	return render(request, 'core/products.html')


def offers(request):
	return render(request, 'core/offers.html')


def about(request):
	return render(request, 'core/about.html')


def contact(request):
	return render(request, 'core/contact.html')
