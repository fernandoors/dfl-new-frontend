import { links } from "../Links"

export default function checkPermission(userPermissions, roles, path) {
  if (path === '/') {
    return true
  }
  const routePermission = links.find(link => link.to.includes(path.split('/')[0])).permission
  const hasRole = roles.filter(role => {
    return userPermissions.includes(`${role}_${routePermission}`)
  })
  return !!hasRole.length
}