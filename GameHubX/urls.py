from django.urls import path, include 
from . import views # views をインポート
from games.ClickRush.views import clickrush_home  # ClickRush のビューをインポート
from games.othello.views import othello_home
from games.blockbreaker.views import blockbreaker_home
from games.shooting.views import shooting_home
from games.hitandblow.views import hitandblow_home
from games.tetris.views import tetris_home

urlpatterns = [
    path('', views.home, name='home'),  # home ビューを URL に紐づけ
    path('ClickRush/', clickrush_home, name='clickrush_home'),
    path('othello/', othello_home, name='othello_home'),
    path('blockbreaker/', blockbreaker_home, name='blockbreaker_home'),
    path('shooting/', shooting_home, name='shooting_home'),
    path('hitandblow/', hitandblow_home, name='hitandblow_home'),
    path('tetris/', tetris_home, name='tetris_home'),
    #path('game2/', include('game2.urls')),  # ゲーム2へのリンク
    # ここに新しいゲームのURLを追加していく
]