import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Diamond, Sparkles, Leaf, Gem, Hand, Settings, Mail } from "lucide-react"

export default function LumeLabLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground font-sans">
      <header className="px-4 lg:px-6 h-20 flex items-center sticky top-0 z-50 text-primary-foreground">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Diamond className="h-6 w-6" />
          <span className="ml-2 text-xl font-semibold tracking-tight">LumeLab</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <Link href="#rings" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Rings
          </Link>
          <Link href="#necklaces" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Necklaces
          </Link>
          <Link href="#bands" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Tennis Bands
          </Link>
          <Link href="#our-story" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Our Story
          </Link>
        </nav>
        <div className="ml-auto lg:ml-4">
          <Button asChild variant="secondary" className="uppercase tracking-wider font-semibold">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 -mt-20">
        <section className="relative w-full min-h-screen flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              layout="fill"
              objectFit="cover"
              alt="Hero background"
              className="bg-fixed"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-xl bg-background/90 p-8 md:p-12 rounded-md">
              <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-6xl xl:text-7xl/none leading-tight mb-6">
                Your Story, Forged in Light
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mb-8">
                Design your own unique piece of jewelry with ethically sourced, high-quality lab-grown diamonds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="uppercase tracking-wider font-semibold">
                  <Link href="#customizer">Create Your Own</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="uppercase tracking-wider font-semibold">
                  <Link href="#rings">Explore Designs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="rings" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Your Style</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From timeless rings to elegant necklaces and brilliant tennis bands, start with a style that speaks to
                  you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    width="400"
                    height="300"
                    alt="Rings"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold">Custom Rings</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Design an engagement ring or personal treasure that's uniquely yours.
                    </p>
                    <Button variant="secondary" className="mt-4 uppercase tracking-wider font-semibold" asChild>
                      <Link href="#customizer">Customize a Ring</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card id="necklaces" className="overflow-hidden border-none shadow-md">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    width="400"
                    height="300"
                    alt="Necklaces"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold">Custom Necklaces</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Create a pendant or necklace that tells your personal story.
                    </p>
                    <Button variant="secondary" className="mt-4 uppercase tracking-wider font-semibold" asChild>
                      <Link href="#customizer">Customize a Necklace</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card id="bands" className="overflow-hidden border-none shadow-md">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    width="400"
                    height="300"
                    alt="Tennis Bands"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold">Tennis Bands</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Craft a band of brilliant, seamless light for any occasion.
                    </p>
                    <Button variant="secondary" className="mt-4 uppercase tracking-wider font-semibold" asChild>
                      <Link href="#customizer">Customize a Band</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm uppercase tracking-wider font-semibold">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Create Your Perfect Piece in 3 Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our intuitive customizer makes it simple to bring your vision to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <Settings className="h-10 w-10 mx-auto text-accent" />
                <h3 className="text-xl font-bold">1. Choose Your Setting</h3>
                <p className="text-muted-foreground">
                  Select your base style and preferred metal—from classic 14k gold to modern platinum.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Gem className="h-10 w-10 mx-auto text-accent" />
                <h3 className="text-xl font-bold">2. Select Your Diamond</h3>
                <p className="text-muted-foreground">
                  Pick the perfect lab-grown diamond. Choose by shape, carat, and quality.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <Hand className="h-10 w-10 mx-auto text-accent" />
                <h3 className="text-xl font-bold">3. Add a Personal Touch</h3>
                <p className="text-muted-foreground">
                  Make it truly yours with a custom engraving or other personal details.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg" className="uppercase tracking-wider font-semibold">
                <Link href="#customizer">Start Designing Now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="our-story" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Modern Alchemy, Conscious Choice
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We believe in jewelry that not only looks beautiful but feels right. Our commitment is to exceptional
                quality, ethical practices, and a transparent process.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Leaf className="h-10 w-10 text-accent" />
                  <h3 className="text-lg font-bold">Ethically Sourced</h3>
                  <p className="text-sm text-muted-foreground">
                    Our lab-grown diamonds are a sustainable choice, free from the environmental and ethical concerns of
                    mining.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Sparkles className="h-10 w-10 text-accent" />
                  <h3 className="text-lg font-bold">Unmatched Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Each diamond is hand-selected for its brilliance and fire, meeting the highest standards of quality
                    and craftsmanship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-foreground text-background py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">LumeLab</h3>
            <p className="text-sm text-background/70">Your Story, Forged in Light.</p>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Shop</h3>
            <Link href="#rings" className="text-background/70 hover:text-background" prefetch={false}>
              Rings
            </Link>
            <Link href="#necklaces" className="text-background/70 hover:text-background" prefetch={false}>
              Necklaces
            </Link>
            <Link href="#bands" className="text-background/70 hover:text-background" prefetch={false}>
              Tennis Bands
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">About</h3>
            <Link href="#our-story" className="text-background/70 hover:text-background" prefetch={false}>
              Our Story
            </Link>
            <Link href="#" className="text-background/70 hover:text-background" prefetch={false}>
              Sustainability
            </Link>
            <Link href="#" className="text-background/70 hover:text-background" prefetch={false}>
              Contact Us
            </Link>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Stay in Touch</h3>
            <p className="text-background/70">Get inspiration and updates delivered to your inbox.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-background/20 border-none rounded-md px-3 py-2 text-sm w-full focus:ring-accent focus:ring-2 outline-none placeholder:text-background/50"
              />
              <Button type="submit" variant="secondary" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="container max-w-7xl mt-8 text-center text-xs text-background/50">
          © 2025 LumeLab. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
