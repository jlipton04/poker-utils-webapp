import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import fs from 'fs'

export default function Home() {
  return (
    <article>
      <ReactMarkdown>{getReadme()}</ReactMarkdown>
    </article>
  )
}

function getReadme() {
  return fs.readFileSync('README.md', 'utf8')
}