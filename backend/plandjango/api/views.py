from django.shortcuts import render
from .models import Plan
from .serializers import PlanSerializer
from django.views.decorators.csrf import csrf_exempt


from rest_framework.generics import ListAPIView, CreateAPIView, DestroyAPIView
# Create your views here.



class PlanList(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanCreate(CreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDestroy(DestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    lookup_field = 'id'
