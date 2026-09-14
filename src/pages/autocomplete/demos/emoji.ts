/** Sample data for the grid layout demo. */

export interface EmojiItem {
  emoji: string;
  name: string;
  /** What the filter matches against. */
  value: string;
}

export interface EmojiGroup {
  value: string;
  items: EmojiItem[];
}

function group(value: string, entries: [string, string][]): EmojiGroup {
  return {
    value,
    items: entries.map(([emoji, name]) => ({ emoji, name, value: name })),
  };
}

export const EMOJI_GROUPS: EmojiGroup[] = [
  group('Faces', [
    ['😀', 'grinning face'],
    ['😄', 'grinning face with smiling eyes'],
    ['😂', 'face with tears of joy'],
    ['🙂', 'slightly smiling face'],
    ['😉', 'winking face'],
    ['😊', 'smiling face with smiling eyes'],
    ['😍', 'smiling face with heart eyes'],
    ['🤔', 'thinking face'],
    ['😴', 'sleeping face'],
    ['🤯', 'exploding head'],
    ['😎', 'smiling face with sunglasses'],
    ['🥳', 'partying face'],
  ]),
  group('Animals', [
    ['🐶', 'dog face'],
    ['🐱', 'cat face'],
    ['🦊', 'fox'],
    ['🐻', 'bear'],
    ['🐼', 'panda'],
    ['🐨', 'koala'],
    ['🦁', 'lion'],
    ['🐸', 'frog'],
    ['🐧', 'penguin'],
    ['🦉', 'owl'],
    ['🐙', 'octopus'],
    ['🦋', 'butterfly'],
  ]),
  group('Objects', [
    ['🚀', 'rocket'],
    ['💡', 'light bulb'],
    ['📦', 'package'],
    ['🔧', 'wrench'],
    ['📌', 'pushpin'],
    ['🎯', 'bullseye'],
    ['🧪', 'test tube'],
    ['🗂️', 'card index dividers'],
    ['⏱️', 'stopwatch'],
    ['🔒', 'locked'],
    ['🧭', 'compass'],
    ['🪄', 'magic wand'],
  ]),
];
