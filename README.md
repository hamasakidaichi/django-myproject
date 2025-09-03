〇ミニゲーム追加方法
1. jangoでappの追加。下記コマンドを実行。
cd games
python ../manage.py startapp ${game_name}

2. プロジェクトにappの追加。
myproject/settings.py の INSTALLED_APPS リストに新しいゲームを追加

3. app.pyでディレクトリ構成の変更
games/tetris/apps.py の name の先頭に games を追加（例： name = 'games.${game_name}'）

4. 親ゲームに新規ゲームを追加
GameHubX の urls.py に新しいゲームを追加する(他のゲーム参照)

5. 新ゲームにリクエスト来た時の処理を追加
games/${game_name}/views.py に下記を追加
def ${game_name}_home(request):
    return render(request, '${game_name}/index.html')

6. index.html の入れ物作成。下記を追加
games/${game_name}/templates/${game_name}/index.html

7. GameHubX に新ゲームを追加。ほかにならって、下記ファイルを修正
GameHubX/templates/home.html