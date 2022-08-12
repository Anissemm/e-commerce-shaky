import { ReactComponent as FacebookIcon } from "../../assets/svg/icons/facebook_footer_icon.svg"
import { ReactComponent as TwitterIcon } from "../../assets/svg/icons/twitter_footer_icon.svg"
import { ReactComponent as YoutubeIcon } from "../../assets/svg/icons/youtube_footer_icon.svg"
import { ReactComponent as InstagramIcon } from "../../assets/svg/icons/instagram_footer_icon.svg"

const SocialLinks = () => {
    return (
        <div>
            <h5 className='uppercase font-[Oswald] font-[18px] font-bold text-sandy-brown pb-3'>Join Us</h5>
            <div className='inline-flex flex-nowrap items-center justify-center fill-sandy-brown'>
                <a
                    className='flex items-center justify-center transition-all duration-300 hover:opacity-75 mr-3'
                    href='https://www.facebook.com'>
                    <span className='sr-only'>Our Facebook</span>
                    <FacebookIcon />
                </a>
                <a
                    className='flex items-center justify-center transition-all duration-300 hover:opacity-75 mr-3'
                    href='https://www.twitter.com'>
                    <span className='sr-only'>Our Twitter</span>
                    <TwitterIcon />
                </a>
                <a
                    className='flex items-center justify-center transition-all duration-300 hover:opacity-75 mr-3'
                    href='https://www.youtube.com'>
                    <span className='sr-only'>Our Youtube</span>
                    <YoutubeIcon />
                </a>
                <a
                    className='flex items-center justify-center transition-all duration-300 hover:opacity-75 mr-3'
                    href='https://www.instagram.com'>
                    <span className='sr-only'>Our Instgramm</span>
                    <InstagramIcon />
                </a>
            </div>
        </div>
    )
}

export default SocialLinks