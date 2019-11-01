from channels.generic.websocket import AsyncWebsocketConsumer
import channels.layers
import json
from . import mqttSub

class MQTTConsumer(AsyncWebsocketConsumer):
    
    async def treat_message(self,msg):
        channel_layer = self.channel_layer
        payload = json.loads(msg.payload, encoding="utf-8")

        await channel_layer.send("mqtt", {
            "type": "value.change",
            "message": payload
         })
        print("check!")

    async def receiveMessage(self):
        client = mqttSub.client
        await client.loop_forever()