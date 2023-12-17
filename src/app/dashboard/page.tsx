import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <div>
        Esta pagina solo puede ser accedida si estas autenticado
    </div>
  )
}

export default Dashboard