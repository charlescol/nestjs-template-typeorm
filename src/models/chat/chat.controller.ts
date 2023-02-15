import { Controller, Post } from "@nestjs/common";

@Controller("chat")
export class ChatController {
  constructor() {} //private readonly chatService: ChatService) {}

  @Post("synchronize")
  async synchronize() {}
}
