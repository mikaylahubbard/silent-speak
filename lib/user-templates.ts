import { User } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

export const defaultSettings = () => ({
  version: 1,
  theme: "light",
  colorTheme: "violet",
});

export const defaultUserDocument = (user: User, name?: string) => ({
  profile: {
    name: name || user.displayName || " ",
    email: user.email || " ",
    phoneNumber: "-",
    age: "-",
  },
  settings: defaultSettings(),
  createdAt: serverTimestamp(),
  editedAt: serverTimestamp(),
});

export const defaultCards = () => [
  {
    title: "I Need Help",
    description: "I'm asking you for assistance with something.",
  },
  {
    title: "I'm Hurt",
    description: "I'm letting you know that I'm in pain or may be injured.",
  },
  {
    title: "I Don't Understand",
    description: "I need you to explain this more clearly or in a simpler way.",
  },
  {
    title: "Please Repeat",
    description: "I'm asking you to say that again.",
  },
  {
    title: "I Need a Break",
    description: "I need some time to rest or step away for a moment.",
  },
  {
    title: "I'm Thirsty",
    description: "I'm letting you know that I would like something to drink.",
  },
  {
    title: "I'm Hungry",
    description: "I'm telling you that I need food or a snack.",
  },
  {
    title: "I Feel Overwhelmed",
    description: "I'm feeling stressed and may need a calmer environment.",
  },
  {
    title: "Call Someone",
    description:
      "I'm asking you to contact a family member, friend, or support person for me.",
  },
  {
    title: "Where Am I?",
    description:
      "I'm feeling confused and need some orientation or reassurance.",
  },
  {
    title: "I Need Quiet",
    description: "I need a quieter or less stimulating space.",
  },
  {
    title: "Thank You",
    description: "I'm expressing appreciation.",
  },
];
