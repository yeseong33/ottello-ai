export interface StoneDesign {
  id: string;
  name: string;
  emoji: string;
  backgroundColor: string;
  shadowColor: string;
}

export const stoneDesigns: StoneDesign[] = [
  {
    id: 'black',
    name: '검은 돌',
    emoji: '⚫',
    backgroundColor: '#000000',
    shadowColor: '#333333'
  },
  {
    id: 'white',
    name: '흰 돌',
    emoji: '⚪',
    backgroundColor: '#FFFFFF',
    shadowColor: '#CCCCCC'
  },
  {
    id: 'tiger',
    name: '호랑이',
    emoji: '🐯',
    backgroundColor: '#FFA500',
    shadowColor: '#CC8400'
  },
  {
    id: 'lion',
    name: '사자',
    emoji: '🦁',
    backgroundColor: '#FFD700',
    shadowColor: '#CCA700'
  },
  {
    id: 'elephant',
    name: '코끼리',
    emoji: '🐘',
    backgroundColor: '#808080',
    shadowColor: '#666666'
  },
  {
    id: 'turtle',
    name: '거북이',
    emoji: '🐢',
    backgroundColor: '#228B22',
    shadowColor: '#1A691A'
  }
];