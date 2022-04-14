from django.urls import path,include
from . import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register('courses',views.coursesView,basename="courses")
router.register('overview',views.overviewView,basename="overview")
router.register('coursepayments',views.coursepaymentView,basename="coursepayments")


urlpatterns=[
    path('',views.home,name="home"),
    path('api/',include(router.urls)),
    path('payment',views.paymentView.as_view(),name="payment"),
    path('login',views.loginView.as_view(),name='login'),
    path('register',views.registerView.as_view(),name='register'),
    path('logout',views.logoutView.as_view(),name="logout"),
    path('success',views.success.as_view(),name="success"),
    path('failure',views.failure.as_view(),name="failure"),
    path('userdetails',views.userdetails.as_view(),name="userdetails"),
    path('usergroups',views.usergroups.as_view(),name="usergroups"),
    path('adminregister',views.adminregisterView.as_view(),name="adminregister")
]

