export interface StoneDesign {
  id: string;
  name: string;
  emoji: string;
  backgroundColor: string;
  shadowColor: string;
  description: string;
}

export type StoneDesignType = StoneDesign;

export const stoneDesigns: StoneDesign[] = [
  {
    id: 'black',
    name: '검은 돌',
    emoji: '⚫',
    backgroundColor: '#000000',
    shadowColor: '#333333',
    description: '기본 검은 돌'
  },
  {
    id: 'white',
    name: '흰 돌',
    emoji: '⚪',
    backgroundColor: '#FFFFFF',
    shadowColor: '#CCCCCC',
    description: '기본 흰 돌'
  },
  {
    id: 'tiger',
    name: '호랑이',
    emoji: '🐯',
    backgroundColor: '#FFA500',
    shadowColor: '#CC8400',
    description: '용맹한 호랑이'
  },
  {
    id: 'lion',
    name: '사자',
    emoji: '🦁',
    backgroundColor: '#FFD700',
    shadowColor: '#CCA700',
    description: '당당한 사자'
  },
  {
    id: 'elephant',
    name: '코끼리',
    emoji: '🐘',
    backgroundColor: '#808080',
    shadowColor: '#666666',
    description: '지혜로운 코끼리'
  },
  {
    id: 'turtle',
    name: '거북이',
    emoji: '🐢',
    backgroundColor: '#228B22',
    shadowColor: '#1A691A',
    description: '신중한 거북이'
  },
  {
    id: 'pufferfish',
    name: '복어',
    emoji: '🐡',
    backgroundColor: '#FF69B4',
    shadowColor: '#CC5490',
    description: '귀여운 복어'
  }
];