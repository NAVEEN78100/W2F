import { NextResponse } from 'next/server'

const cards = [
  {
    title: "Jeton Card Available in the European Zone",
    subtitle: "The Jeton Physical Card can now be ordered from EU countries. Use it in-store or add it to Apple or Google Wallet for instant contactless transactions.",
    imageUrl: "/company/feedback/wwwroot/images/feedback/feedback.jpg",
    category: "Feedback",
    contentHtml: `<p>We're pleased to announce that Jeton Card is now available physically for users in EU countries. This new option allows you to use your balances in more ways, both online and in-store.</p>
<p>The <strong>Jeton Physical Card</strong> can be used for card payments across a wide range of merchants. You can tap to pay where contactless is accepted or link your card to <strong>Google Wallet</strong> or <strong>Apple Wallet</strong> for digital transactions via your mobile device.</p>
<p>Ordering your card can be done directly through the Jeton app or from jeton.com website. Once received, you can activate it in-app, start your journey, monitor transactions in real-time, and manage your card settings securely and efficiently.</p>
<p>The physical card gives users an additional way to access and use their Jeton balance, offering more flexibility in how and where payments are made—whether in person or digitally within supported regions.</p>
<p><strong>Jeton Physical Card is now available to order across the EU.</strong> Check the Jeton App for availability and delivery information in your country.</p>`
  },
  {
    title: "Manage Over 20 Currencies with the Jeton App",
    subtitle: "Manage, exchange, and spend 20 currencies in one secure app. Jeton gives you full control of your global finances.",
    imageUrl: "/company/feedback/wwwroot/images/feedback/premium.jpg",
    category: "EarlyAccess",
    contentHtml: `<p>We're excited to introduce enhanced multi-currency support in the Jeton App, allowing you to manage over 20 different currencies in one secure, easy-to-use platform.</p>
<p>This powerful feature gives you complete control over your global finances, whether you're traveling, doing business internationally, or simply want to diversify your currency holdings.</p>`
  },
  {
    title: "Introducing the Jeton Virtual Card",
    subtitle: "Discover the new Jeton Virtual Card – shop online safely without sharing your sensitive information. Order your card today through the Jeton app or website.",
    imageUrl: "/company/feedback/wwwroot/images/feedback/bugg.jpg",
    category: "BugBounty",
    contentHtml: `<p>We're excited to announce the launch of the <strong>Jeton Virtual Card</strong>, now available for all Jeton users!</p>
<p>Designed to give you greater control, security, and convenience, the Jeton Virtual Card is the perfect solution for your online transactions.</p>
<p>The Jeton Virtual Card allows you to make online purchases securely, without ever exposing your sensitive financial information. Simply generate your card, use it on websites and apps as you would a physical card, and enjoy a seamless checkout experience—all while keeping your actual account details private.</p>`
  }
]

export function GET() {
  return NextResponse.json({ ok: true, cards })
}
