export default function addKeyToData(content) {
  return { ...content, key: content.id }
}