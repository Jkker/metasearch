import Link from '@/components/Link';
import siteMetadata from '@/data/siteMetadata';
export default function Footer() {
	return (
		<footer className='fixed bottom-0 z-50 w-full flex flex-col items-center text-xs sm:text-sm text-white sm:text-gray-200 dark:text-gray-300 sm:dark:text-gray-400 mb-1 lg:mb-3'>
			{/* <div className="flex mb-3 space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
        </div> */}
			<div className='flex space-x-2'>
				<Link href='http://www.jerrykjia.com/'>{siteMetadata.author}</Link>
				<div>{` • `}</div>
				<div>{`© ${new Date().getFullYear()}`}</div>
			</div>
			{/* 			<div className='mb-8 '>
				<Link href='/ack'>Acknowledgement / Legal Information</Link>
			</div> */}
		</footer>
	);
}
