export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Layanan',
    href: '#',
    children: [
      { label: 'Cetak Undangan', href: '/layanan/cetak-undangan' },
      { label: 'Cetak Foto', href: '/layanan/cetak-foto' },
    ],
  },
  { label: 'Portofolio', href: '/portofolio' },
  { label: 'Harga', href: '/harga' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/kontak' },
  { label: 'Testimoni', href: '/testimoni' },
];
