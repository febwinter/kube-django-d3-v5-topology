# mysite/routing.py
from channels.routing import ProtocolTypeRouter

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    # 'websocket' : AuthMiddlewareStack(
    #     URLRouter(
    #         dashboard.routing.websocket_urlpatterns
    #     )
    # ),
})