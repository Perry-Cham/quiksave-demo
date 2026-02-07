import { Clock8Icon, MapPinIcon, BriefcaseBusinessIcon, PhoneIcon } from 'lucide-react'

import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-01/contact-us-page-01'

const contactInfo = [
  {
    title: 'Office Hours',
    icon: Clock8Icon,
    description: 'Monday-Friday\n8:00 am to 5:00 pm'
  },
  {
    title: 'Our Address',
    icon: MapPinIcon,
    description: 'Woodlands Lusaka\n10101, Zambia'
  },
  {
    title: 'Office 2',
    icon: BriefcaseBusinessIcon,
    description: 'Munali Lusaka\n10101, Zambia'
  },
  {
    title: 'Get in Touch',
    icon: PhoneIcon,
    description: '0977 3454 62'
  }
]

const ContactUsPage = () => {
  return <ContactUs contactInfo={contactInfo} />
}

export default ContactUsPage
