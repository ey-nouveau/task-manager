export const MOCK_TAGS = [
  { name: 'Web', color: 'var(--color-blue)' },
  { name: 'SaaS', color: 'var(--color-purple)' },
  { name: 'App', color: 'var(--color-orange)' },
  { name: 'Research', color: 'var(--color-mint)' },
  { name: 'Copywrite', color: 'var(--color-sage)' },
  { name: 'Redesign', color: 'var(--color-yellow)' }
];

export const getMockTaskMeta = (id: string | number) => {
  const str = String(id);
  let hash = 0;
  for(let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);
  
  // ensure unique tags
  const tag1 = MOCK_TAGS[absHash % MOCK_TAGS.length];
  const tag2 = MOCK_TAGS[(absHash + 1) % MOCK_TAGS.length];
  
  return {
    comments: (absHash % 5) + 1,
    attachments: (absHash % 8),
    checklist: `${absHash % 3}/${(absHash % 3) + 2}`,
    tags: [tag1, tag2],
    dueDate: '24 Sep - 5 Oct'
  };
};