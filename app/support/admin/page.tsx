import { redirect } from "next/navigation"

export default function SupportAdminRedirect() {
  redirect("http://127.0.0.1:8080/admin")
}
