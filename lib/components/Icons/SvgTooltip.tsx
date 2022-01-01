import * as React from "react"
import { SVGProps } from "react"

const SvgTooltip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30 13.5c-9.113 0-16.5 7.387-16.5 16.5S20.887 46.5 30 46.5 46.5 39.113 46.5 30 39.113 13.5 30 13.5ZM10.5 30c0-10.77 8.73-19.5 19.5-19.5S49.5 19.23 49.5 30 40.77 49.5 30 49.5 10.5 40.77 10.5 30Z"
      fill="#777"
    />
    <path
      d="M28.405 34.325c0-1.185.144-2.128.432-2.83.288-.703.812-1.393 1.574-2.07.77-.686 1.282-1.24 1.536-1.663a2.64 2.64 0 0 0 .381-1.359c0-1.43-.66-2.145-1.98-2.145-.627 0-1.13.195-1.511.584-.372.38-.567.91-.584 1.587H24.57c.017-1.617.538-2.882 1.562-3.796 1.032-.914 2.437-1.371 4.215-1.371 1.794 0 3.186.436 4.176 1.307.99.864 1.486 2.087 1.486 3.67 0 .719-.161 1.4-.483 2.043-.321.635-.884 1.342-1.688 2.12l-1.029.978c-.643.618-1.01 1.341-1.104 2.17l-.05.775h-3.25Zm-.368 3.898c0-.567.19-1.033.571-1.397.39-.372.885-.558 1.486-.558.6 0 1.091.186 1.472.558.39.364.584.83.584 1.397 0 .558-.19 1.02-.57 1.383-.373.364-.868.546-1.486.546s-1.117-.182-1.498-.546c-.373-.364-.559-.825-.559-1.383Z"
      fill="#777"
    />
  </svg>
)

export default SvgTooltip