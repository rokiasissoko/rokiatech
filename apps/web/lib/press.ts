// Press coverage about Rokia, shared by the /press page and the Person JSON-LD in app/layout.tsx.

export type PressArticle = {
  date: string
  outlet: string
  headline: string
  url: string
}

export type CampaignVideo = {
  id: string
  title: string
  duration: string
  thumb: string
}

// ordered by outlet prominence, most recognizable first; the /press page lists them in this order
export const pressArticles: PressArticle[] = [
  {
    date: '2015-02-01',
    outlet: 'NBC News',
    headline: "These Kids From The Bronx Inspired Verizon's Black History Ad",
    url: 'https://www.nbcnews.com/news/nbcblk/these-kids-bronx-inspired-verizons-black-history-ad-n297806',
  },
  {
    date: '2013-03-20',
    outlet: 'New York Daily News',
    headline:
      'Mott Haven 6th graders take top honors in national app design contest; students use game to teach math',
    url: 'https://www.nydailynews.com/2013/03/20/mott-haven-6th-graders-take-top-honors-in-national-app-design-contest-students-use-game-to-teach-math/',
  },
  {
    date: '2012-11-29',
    outlet: 'New York Daily News',
    headline:
      'Once-failing Bronx charter school rings in this school year with smartphones and higher scores',
    url: 'https://www.nydailynews.com/2012/11/29/once-failing-bronx-charter-school-rings-in-this-school-year-with-smartphones-and-higher-scores/',
  },
  {
    date: '2015-02-04',
    outlet: 'The Root',
    headline: "We Can't Sit Back and Watch History, We've Got to Create It",
    url: 'https://www.theroot.com/we-cant-sit-back-and-watch-history-weve-got-to-create-it',
  },
  {
    date: '2015-02-04',
    outlet: 'DNAinfo New York',
    headline: 'South Bronx Students Starring in National Verizon Wireless Ad Campaign',
    url: 'https://www.dnainfo.com/new-york/20150204/high-bridge/south-bronx-students-starring-national-verizon-wireless-ad-campaign',
  },
  {
    date: '2015-02-07',
    outlet: 'Bronx Times',
    headline: 'Bronx students are face of Verizon campaign',
    url: 'https://www.bxtimes.com/bronx-students-are-face-of-verizon-campaign/',
  },
  {
    date: '2015-02-06',
    outlet: 'Bronx Times (print edition)',
    headline: 'Bronx students are face of Verizon app',
    url: 'https://www.bxtimes.com/wp-content/uploads/assets/pdf/2015_06bxt.pdf',
  },
  {
    date: '2015-02-06',
    outlet: 'Hello Beautiful',
    headline:
      'Beautiful News: Six 8th Graders Of Color From The Bronx To Star In Two Inspiring Verizon Commercials',
    url: 'https://hellobeautiful.com/2768368/kids-from-the-bronx-star-in-verizon-black-history-month-commercials/',
  },
  {
    date: '2015-02-06',
    outlet: 'MyPraise 102.5 Atlanta',
    headline:
      'Beautiful News: 6 8th Graders Of Color From The Bronx To Star In Two Inspiring Verizon Commercials',
    url: 'https://mypraiseatl.com/1556880/beautiful-news-6-8th-graders-of-color-from-the-bronx-to-star-in-two-inspiring-verizon-commercials-video/',
  },
  {
    date: '2015-02-17',
    outlet: 'UrbanGeekz',
    headline: 'Bronx kids design Math App to become faces of major ads campaign',
    url: 'https://urbangeekz.com/2015/02/bronx-kids-design-award-winning-math-app-become-faces-major-ads-campaign/',
  },
  {
    date: '2015-02-02',
    outlet: 'Welcome2TheBronx',
    headline:
      'Bronx Kids Who Beat 350 Teams In Country To Create Math App Will Be Featured in Black History Month Verizon Ad',
    url: 'https://www.welcome2thebronx.com/2015/02/bronx-kids-who-beat-350-teams-in-country-to-create-math-app-will-be-featured-in-black-history-month-verizon-ad/',
  },
  {
    date: '2015-02-03',
    outlet: 'The Evangelical Covenant Church',
    headline: 'Bronx Kids Featured in Verizon Black History Month Commercial',
    url: 'https://covchurch.org/2015/02/02/bronx-kids-featured-in-verizon-black-history-month-commercial/',
  },
]

// the Verizon "Create History" TV spot the press above covers
export const verizonAd = {
  name: "Verizon TV Spot, 'Create History: Assembly'",
  url: 'https://www.ispot.tv/ad/7xoi/verizon-create-history-assembly',
  date: '2015-02-02',
  description:
    'Verizon Black History Month commercial featuring the six Bronx Academy of Promise students who won the Verizon Innovative App Challenge.',
}

// Vimeo cuts of the same campaign featuring Rokia; thumbnails and durations from Vimeo oEmbed
export const campaignVideos: CampaignVideo[] = [
  {
    id: '118177814',
    title: "Verizon 'Create History: Assembly' (30s spot)",
    duration: 'PT30S',
    thumb: '505150468-dbc536acd4426eeaebb24ab8a3ab36799b054c889db8fe5fc98b20915c68b436',
  },
  {
    id: '118177812',
    title: 'Verizon Create History: Opening Doors',
    duration: 'PT1M59S',
    thumb: '505150472-21e7cda7b3a365c8846d3b93edcaa38079f66b685f500d3eebee154632b3c386',
  },
  {
    id: '118177813',
    title: 'Verizon Create History: How We Built an App',
    duration: 'PT2M12S',
    thumb: '505150474-ea87de8b05bb5c47fae6def0f57bd2e24a7843f6412e3e8bd4cc5d3f63f01737',
  },
]

// JPMorganChase LinkedIn video featuring Rokia's team, Immersive Tech II; details from the post's own VideoObject
export const jpmcFeature = {
  title: 'JPMorganChase: From artificial intelligence to virtual reality',
  url: 'https://www.linkedin.com/posts/from-artificial-intelligence-to-virtual-reality-ugcPost-7234590697306116097-wA3t/',
  embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7234590698224709633?compact=true',
  thumbnailUrl:
    'https://media.licdn.com/dms/image/v2/D4D10AQFgIQL4QfGR-A/videocover-high/videocover-high/0/1724860814534?e=2147483647&v=beta&t=aDUYwJ_7scmx4V3FtZ-r-1Z7SZha5_zJoYnZdb6-Q-0',
  date: '2024-08-28',
  duration: 'PT30S',
}

// schema.org items for the Person's subjectOf
export const pressJsonLd = [
  ...pressArticles.map(({ date, outlet, headline, url }) => ({
    '@type': 'NewsArticle',
    headline,
    url,
    datePublished: date,
    publisher: { '@type': 'Organization', name: outlet },
  })),
  {
    '@type': 'CreativeWork',
    name: verizonAd.name,
    url: verizonAd.url,
    datePublished: verizonAd.date,
    description: verizonAd.description,
    sponsor: { '@type': 'Organization', name: 'Verizon' },
  },
  ...campaignVideos.map(({ id, title, duration, thumb }) => ({
    '@type': 'VideoObject',
    name: title,
    description:
      'From Verizon\'s 2015 Black History Month "Create History" campaign featuring Bronx Academy of Promise students, including Rokia Sissoko.',
    url: `https://vimeo.com/${id}`,
    embedUrl: `https://player.vimeo.com/video/${id}`,
    thumbnailUrl: `https://i.vimeocdn.com/video/${thumb}-d_640`,
    uploadDate: '2015-01-29',
    duration,
  })),
  {
    '@type': 'VideoObject',
    name: jpmcFeature.title,
    description:
      "JPMorganChase video on its technologists shaping AI and virtual reality, featuring Rokia Sissoko's team, Immersive Tech II.",
    url: jpmcFeature.url,
    embedUrl: jpmcFeature.embedUrl,
    thumbnailUrl: jpmcFeature.thumbnailUrl,
    uploadDate: jpmcFeature.date,
    duration: jpmcFeature.duration,
    publisher: { '@type': 'Organization', name: 'JPMorganChase' },
  },
]
