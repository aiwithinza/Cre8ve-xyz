import { GetServerSideProps } from 'next'

function Sitemap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://cre8ve.xyz'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/work</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default Sitemap
