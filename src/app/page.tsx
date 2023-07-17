import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'
import fs from 'fs'

export default function Home() {
  return (
    <article>
      <ReactMarkdown remarkPlugins={[remarkGfm]} >{getReadme()}</ReactMarkdown>
    </article>
  )
}

function getReadme() {
  return fs.readFileSync('README.md', 'utf8')
}