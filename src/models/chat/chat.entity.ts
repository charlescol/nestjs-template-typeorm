import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("chat")
export default class Message {
  @ApiProperty({ description: "The message identifier" })
  @PrimaryColumn({
    type: "varchar",
    length: 300,
  })
  id: string;

  @ApiProperty({
    description: "Date of the message",
    type: "createdDate",
    example: "2023-02-22",
  })
  @Column({ name: "createdAt", type: "date" })
  createdDate: Date;

  @ApiProperty({
    description: "Content of the message",
    type: "text",
    example: "Hello World !",
  })
  @Column({ name: "content", type: "text" })
  content: string;

  @ApiProperty({
    description: "Sender Id",
    type: "varchar",
    example: "61edd2771808090100ef4cdf6259b057a0dead01002300dd",
  })
  @Column({ name: "senderId", type: "varchar" })
  senderId: string;

  @ApiProperty({
    description: "Receiver Id",
    type: "varchar",
    example: "61edd2771808090220ef4cdf6259b057a0dead01002300dd18",
  })
  @Column({ name: "receiverId", type: "varchar" })
  receiverId: string;
}
