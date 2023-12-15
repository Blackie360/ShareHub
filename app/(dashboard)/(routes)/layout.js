import React from 'react'
import SideNav from '../_component/SideNav'
import TopHeader from '../_component/ToHeader'

const layout = ({children}) => {
  return (
    <div>
        <div className=' h-full w-64 flex-col fixed inset-y-0 z-50'>
            <SideNav />
        </div>
        <div className='ml-64'>
          <TopHeader />
        {children}
        </div>
      
    </div>
  )
}

export default layout
