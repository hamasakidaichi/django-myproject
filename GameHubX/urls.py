from django.urls import path, include 
from . import views # views をインポート
from games.ClickRush.views import clickrush_home  # ClickRush のビューをインポート
from games.othello.views import othello_home
from games.blockbreaker.views import blockbreaker_home
from games.shooting.views import shooting_home
from games.hitandblow.views import hitandblow_home
from games.tetris.views import tetris_home
from games.game_2048.views import game_2048_home
from games.typing_game.views import typing_game_home
from games.aim_training.views import aim_training_home



urlpatterns = [
    path('', views.home, name='home'),  # home ビューを URL に紐づけ
    path('dev_explain/', views.dev_explain, name='dev_explain'),
    path('ClickRush/', clickrush_home, name='clickrush_home'),
    path('othello/', othello_home, name='othello_home'),
    path('blockbreaker/', blockbreaker_home, name='blockbreaker_home'),
    path('shooting/', shooting_home, name='shooting_home'),
    path('hitandblow/', hitandblow_home, name='hitandblow_home'),
    path('tetris/', tetris_home, name='tetris_home'),
    path('game_2048/', game_2048_home, name='game_2048_home'),
    path('typing_game/', typing_game_home, name='typing_game_home'),
    path('aim_training/', aim_training_home, name='aim_training_home'),
    # ここに新しいゲームのURLを追加していく
]