
 import HotelsDetail from '@/views/detailHotels'

export default async function Page({params}) {
  return (
    <div>
      <HotelsDetail id={(await params).id}/>
    </div>
  )
}