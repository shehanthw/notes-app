"use client";

import React from 'react'

interface Props {
    title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <div className='text-lg py-2 font-medium'>{title}</div>
  )
}

export default PageTitle