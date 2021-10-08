import React from 'react'

const TrophyIcon = ({ size = '40', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M276.807 452h-41.613c-5.523 0-10 4.478-10 10s4.477 10 10 10h41.613c5.523 0 10-4.478 10-10s-4.477-10-10-10z"></path>
    <path d="M456 80.001h-60V58.28c11.639-4.128 20-15.243 20-28.28 0-16.542-13.458-30-30-30H126c-16.542 0-30 13.458-30 30.001 0 13.036 8.361 24.151 20 28.279v21.721H56c-5.523 0-10 4.478-10 10v70c0 44.112 35.888 80 80 80h8.455a141.1 141.1 0 006.187 9.849c14.155 20.546 33.259 36.791 55.57 47.392a30.126 30.126 0 00-.212 3.51c0 14.011 9.657 25.807 22.663 29.089C206.647 369.876 185.294 412 160 412h-24a10 10 0 00-9.923 8.76l-10 80A10 10 0 00126 512h260a9.998 9.998 0 009.923-11.24l-10-80A9.999 9.999 0 00376 412h-24c-15.309 0-28.244-16.075-36.399-29.562-10.48-17.33-17.799-37.744-22.262-52.599C306.345 326.557 316 314.761 316 300.751a30.14 30.14 0 00-.212-3.51c22.315-10.602 41.421-26.851 55.577-47.401a141.177 141.177 0 006.18-9.839H386c44.112 0 80-35.888 80-80v-70c0-5.522-4.477-10-10-10zm-390 80v-60h50v70.75a138.8 138.8 0 008.997 49.225C92.375 219.436 66 192.749 66 160.001zM374.672 492H137.328l7.5-60h222.344zm-62.094-80H199.423c4.859-5.326 9.545-11.705 14.045-19.137 12.782-21.11 21.173-45.981 25.762-62.112h33.541c4.593 16.148 12.967 40.956 25.716 62.037 4.514 7.464 9.215 13.868 14.091 19.212zM286 310.751h-60c-5.514 0-10-4.486-10-10s4.486-10 10-10h60c5.514 0 10 4.486 10 10s-4.486 10-10 10zm20.948-31.447c-5.411-5.286-12.804-8.553-20.948-8.553h-60c-8.144 0-15.536 3.267-20.948 8.553C162.892 259.452 136 217.561 136 170.751V60h74.997c5.523 0 10-4.478 10-10s-4.477-10-10-10H126c-5.514 0-10-4.486-10-10s4.486-10 10-10h260c5.514 0 10 4.486 10 10.001 0 5.514-4.486 9.999-10 9.999h-85.003c-5.523 0-10 4.478-10 10s4.477 10 10 10H376v110.751c0 46.808-26.893 88.701-69.052 108.553zM446 160.001c0 32.748-26.375 59.435-58.997 59.975A138.796 138.796 0 00396 170.751v-70.75h50z"></path>
    <path d="M307.09 130.399l-22.428-3.973-11.138-20.489a19.892 19.892 0 00-8.141-8.07 19.837 19.837 0 00-15.205-1.484 19.836 19.836 0 00-11.803 9.707l-10.708 20.101-22.493 4.181a19.86 19.86 0 00-10.668 5.324 19.846 19.846 0 00-6.123 14.008 19.839 19.839 0 005.583 14.241l15.82 16.409-2.902 22.128a19.808 19.808 0 001.689 12.363 19.856 19.856 0 0011.455 10.146 20.034 20.034 0 006.538 1.104c2.991 0 5.967-.68 8.735-2.027l20.465-9.962 21.063 10.035a19.907 19.907 0 0011.341 1.739 19.844 19.844 0 0013.191-7.731c3.22-4.254 4.591-9.509 3.858-14.808l-3.154-22.569 15.466-16.313a19.823 19.823 0 005.792-10.931c1.894-10.86-5.398-21.237-16.233-23.129zm-3.897 20.113l-18.956 19.994a10 10 0 00-2.647 8.264l3.845 27.317-25.417-12.108a10 10 0 00-8.678.037l-24.787 12.082c.049-.237.089-.476.12-.715l3.568-27.202a9.997 9.997 0 00-2.716-8.241l-19.178-19.822c.113-.017.226-.036.338-.057l27.368-5.086a10.003 10.003 0 006.999-5.13l12.919-24.317 13.418 24.683a9.998 9.998 0 007.042 5.07l27.196 4.799a9.82 9.82 0 00-.434.432zM256 60c5.523 0 10-4.478 10-10s-4.477-10-10-10h-.007c-5.523 0-9.996 4.478-9.996 10s4.48 10 10.003 10z"></path>
  </svg>
)

export default TrophyIcon