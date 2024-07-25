import user from "../../../public/User1.png";
import user2 from "../../../public/User2.png";
import loggedInUser from "../../../public/loggedInUser.jpg";

export const userData = [
  {
    id: 1,
    avatar: user,
    messages: [
      {
        id: 1,
        avatar: user,
        name: "Jane Doe",
        message: "Hey, Jakob",
      },
      {
        id: 2,
        avatar: loggedInUser,
        name: "Jakob Hoeg",
        message: "Hey!",
      },
      {
        id: 3,
        avatar: user,
        name: "Jane Doe",
        message: "How are you?",
      },
      {
        id: 4,
        avatar: loggedInUser,
        name: "Jakob Hoeg",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar: user,
        name: "Jane Doe",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: loggedInUser,
        name: "Jakob Hoeg",
        message: "That is good to hear!",
      },
      {
        id: 7,
        avatar: user,
        name: "Jane Doe",
        message: "How has your day been so far?",
      },
      {
        id: 8,
        avatar: loggedInUser,
        name: "Jakob Hoeg",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      },
      {
        id: 9,
        avatar: user,
        name: "Jane Doe",
        message: "I had a relaxing day. Just catching up on some reading.",
      },
    ],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar: user2,
    name: "John Doe",
  },
  {
    id: 3,
    avatar: user2,
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar: user2,
    name: "John Smith",
  },
];

export const loggedInUserData = {
  id: 5,
  avatar: loggedInUser,
  name: "Jakob Hoeg",
};
