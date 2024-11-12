import RoomDetail from "@/views/roomDetail"

export default async function Page({params}) {
  return (
    <div>
      <RoomDetail id={(await params).id} />
    </div>
  )
}