<template>
  <header class="py-2 sticky top-0 z-10 font-logo bg-main border-b">
    <div class="flex items-center justify-between max-sm:justify-around gap-4 text-slate-600 text-sm">
      <div class="px-5 flex justify-start items-center gap-8 max-sm:py-2">
        <a href="/" :class="`lg:mr-10 ${connected ? 'text-slate-700' : 'text-red-700'}`">
          <Logo class="h-10" />
        </a>
      </div>

      <div class="flex justify-end items-center gap-8 mr-10 max-sm:mr-0">

        <div class="flex justify-around gap-2">
          <button @click="rightTabIndex = 0; isRightDrawerOpen = true" class="max-sm:hidden bg-white h-9 px-5 flex justify-center items-center border rounded-full"><IconBookOpen class="w-6 h-6 mr-1" /> Overview</button>
          <button @click="rightTabIndex = 1; isRightDrawerOpen = true" class="max-sm:hidden bg-white h-9 px-5 flex justify-center items-center border rounded-full">Citations</button>
          <button @click="rightTabIndex = 2; isRightDrawerOpen = true" class="max-sm:hidden bg-white h-9 px-5 flex justify-center items-center border rounded-full"><IconWandMagic class="w-6 h-6 mr-1 -rotate-90" /> AI Detection</button>
        </div>

        <div class="flex gap-8">
          <div class="flex items-center gap-2 relative">
            <button v-show="!user.plan?.renewalType" aria-controls="feedback-modal" @click.stop="planModalOpen = true" class="px-4 py-2 mx-1 text-white border rounded-full bg-red-600 text-sm flex items-center">
              Upgrade
            </button>
            <button class="max-sm:hidden h-9 px-5 flex justify-center items-center border rounded-full bg-white" @click.stop="chooseFileTypeOpen = !chooseFileTypeOpen">Export</button>
            <div class="absolute top-10 right-0 w-48 flex flex-col items-center shadow rounded-lg px-3 py-2 bg-white" v-show="chooseFileTypeOpen" @mouseleave="chooseFileTypeOpen = false" >
              <button class="flex items-center justify-center gap-2 mb-1" @click.stop="exportOne(essay?.id, essay?.title, 'doc')">Word (.docx)</button>
              <button class="flex items-center justify-center gap-2 mb-1" @click.stop="exportOne(essay?.id, essay?.title, 'pdf')">PDF (.pdf)</button>
              <button class="flex items-center justify-center gap-2" @click.stop="exportOne(essay?.id, essay?.title, 'clip')">Copy to clipboard</button>
            </div>
            <button @click.stop="settingModalOpen = true"><IconSetting class="w-6 h-6" /></button>
          </div>

          <div v-if="!loggedIn" class="flex items-center gap-4">
            <Button
                href="/login"
                class="border-secondary-600"
            >
              Log in
            </Button>

            <Button
                href="/register"
                class="border-secondary-600"
            >
              Sign up <span v-text="'for free'" class="hidden lg:inline" />
            </Button>
          </div>

          <div v-else class="flex gap-5">
            <DropdownProfile :user="user" @openBillingModal="openBillingModal" />
          </div>
        </div>


      </div>
    </div>
  </header>
  <main class="lg:h-[calc(100vh-56px)] flex max-sm:h-[calc(100vh-56px)]">
    <div class="bg-main flex-1 flex max-sm:flex-col">
      <div :class="`left-section relative lg:w-64 max-sm:w-full border-r px-5 ${isLeftDrawerOpen ? '' : 'hidden'} transition duration-300 ease-in-out flex flex-col justify-between`">
        <div class="left-up py-4">
          <form class="search pt-5 pb-5 max-sm:pt-5 max-sm:pb-2">
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search"
                     class="block w-full p-2 ps-10 text-sm text-gray-900 border-gray-300 rounded bg-white focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Search" required />
            </div>
          </form>
          <div class="flex justify-center">
            <button aria-controls="newsletter-modal" @click.stop="generateModalOpen = true" class="w-full py-3 flex justify-center items-center border rounded-full border-bright-red text-bright-red bg-white">New Document +</button>
          </div>
          <div class="mt-2 rounded px-3 pt-3 pb-2 max-sm:py-1">
            <div class="flex justify-between items-center pb-3">
              <h3 class="text-sm text-slate-300 font-bold">Document</h3>
            </div>
            <div class="flex flex-col items-start">
              <div v-for="ess in essayArr.slice(0, 6)" class="w-full flex justify-between">
                <button class="text-sm text-slate-900 font-bold py-1" @click="fetchFullEssay(ess.id)" v-text="truncateText(ess.title)"></button>
                <div class="action relative" @mouseleave="selectedEssay = undefined">
                  <button class="w-5 h-5" @mouseenter="selectedEssay = ess.id">...</button>
                  <div
                      class="absolute top-5 right-0 bg-white border flex flex-col gap-2 px-4 py-1 rounded shadow z-10"
                      v-show="selectedEssay === ess.id"
                  >
<!--                    <button class="text-sm text-primary-700" @click.stop="exportOne(ess.id, ess.title)">Export</button>-->
                    <button class="text-sm text-primary-700" @click.stop="deleteOne(ess.id)">Delete</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="left-down my-3 max-sm:hidden">
          <div>
            <div class="flex items-center mb-2 text-slate-700 hover:cursor-pointer hover:text-primary-700">
              <IconBadgeCheck class="w-5 h-5" />
              <p class="font-bold pl-3">Tutorials</p>
            </div>
<!--            <div class="flex items-center mb-2 text-slate-700 hover:cursor-pointer hover:text-primary-700">-->
<!--              <IconBadgeCheck class="w-5 h-5" />-->
<!--              <p class="font-bold pl-3">Rewards & Referrals</p>-->
<!--            </div>-->
          </div>
          <div v-show="!user.plan?.renewalType" class="relative max-sm:hidden mt-10 rounded-lg px-3 pt-10 pb-5 bg-orange-200 text-center font-bold hover:cursor-pointer" @click.stop="planModalOpen = true">
            <h2 class="mb-3">Unlock Best Plan</h2>
            <p class="text-sm text-slate-800">Invite your friends and <br>
              together, let's unlock <br>
              the magic of up to <br>
              unlimited words!</p>
            <div
                class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 w-16 h-16 border-8 border-white rounded-full">
            </div>
          </div>
<!--          <div class="pt-5">-->
<!--            <button @click="logout" class="py-1 flex items-center text-sm font-bold text-slate-700 hover:text-primary-700">-->
<!--              <IconLogout class="w-5 h-5 mr-1" /> Logout-->
<!--            </button>-->
<!--          </div>-->
          <div v-show="!user.plan?.renewalType" class="limit mt-3 mb-1">
            <div class="flex justify-between mb-2 text-sm text-slate-700 font-bold">
              <p class="">AI Limit</p>
              <p class="" v-text="`${wordCnt}/${wordLimitedCnt}`"></p>
            </div>
            <div class="relative">
              <div class="w-full h-2 bg-slate-200 rounded-full"></div>
              <div class="absolute top-0 h-2 rounded-full" :class="limitClasses"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-section relative flex-1 max-sm:pb-28 transition duration-300 ease-in-out">
        <button @click="toggleLeftDrawer" :class="`max-sm:hidden absolute top-1 px-1 my-1 bg-slate-300 hover:bg-primary-600 ${isLeftDrawerOpen ? '-left-6 rounded-l-full' : 'left-0 rounded-r-full'}`">
          <IconChevronsLeft v-if="isLeftDrawerOpen" class="w-4 h-4 text-white" />
          <IconChevronsRight v-else class="w-4 h-4 text-white" />
        </button>
        <button @click="toggleRightDrawer" :class="`max-sm:hidden absolute px-1 my-1 bg-slate-300 hover:bg-primary-600 ${isRightDrawerOpen ? '-right-6 rounded-r-full' : 'hidden'}`">
          <IconChevronsLeft v-if="!isRightDrawerOpen" class="w-4 h-4 text-white" />
          <IconChevronsRight v-else class="w-4 h-4 text-white" />
        </button>
<!--        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2">-->
<!--          <div class="flex justify-center items-center lg:gap-2 border rounded-full bg-primary-500 px-3 py-1">-->
<!--            <button class="h-8 px-3 max-sm:px-1 flex justify-center items-center text-white text-sm hover:text-slate-500"><IconBookOpen class="w-5 h-5 mr-1" /> Overview</button>-->
<!--            <button class="h-8 px-3 max-sm:px-1 flex justify-center items-center text-white text-sm hover:text-slate-500"><IconLightingVolt class="w-5 h-5" /> Citation</button>-->
<!--            <button class="h-8 px-3 max-sm:px-1 flex justify-center items-center text-white text-sm hover:text-slate-500"><IconWandMagic class="w-5 h-5 mr-1 -rotate-90" /> AI Detection</button>-->
<!--          </div>-->
<!--        </div>-->
        <div class="h-full overflow-y-auto" ref="essayContainer" style="scroll-behavior: smooth;">
          <div class="max-w-[800px] max-sm:w-full max-sm:px-3 lg:h-full m-auto lg:flex pt-12 pb-10">
            <div class="max-sm:flex-1 w-full">
<!--              <div class="flex max-sm:flex-col justify-center items-center gap-5">
                <input type="text"
                       class="block w-46 max-sm:w-full max-sm:m-auto p-2 text-sm text-gray-900 border border-gray-300 rounded bg-white focus:ring-blue-500 focus:border-blue-500 w-[400px]"
                       placeholder="Essay title" v-model="essayTitle" />
                <button :disabled="generating"
                        class="px-4 py-2 mx-1 border bg-white text-black rounded-lg text-sm hover:bg-primary-600 hover:text-white"
                        @click="generateEssay">{{ generating ? 'Generating...' : 'Generate Essay' }}</button>
              </div>-->
              <template v-if="essay">
                <h1 class="text-3xl text-center font-bold pt-15 pb-5" v-text="essay?.title"></h1>
                <div v-for="(section, index) in essay.sections" :id="'section' + index" :class="`mt-5 py-2 px-5 rounded-lg ${(selectedId === index) && (rightTabIndex === 0) ? 'bg-white' : ''}`">
                  <h2 class="text-2xl font-medium mb-3">{{ section.section_title }}</h2>
                  <p class="px-5 py-1">
                    <template v-for="content in section.section_content">
                      <span v-text="content.sentence"></span>
                      <span v-if="content.citation > -1">( </span>
                      <a v-if="content.citation > -1" v-text="`${essay.reference_result[content.citation].author.split(',')[0]} et al., ${essay.reference_result[content.citation].year}.`" @click="selectedId = index; rightTabIndex = 1; isRightDrawerOpen = true" :id="content.citation" :class="`${(selectedId === index) && (rightTabIndex === 1) ? 'bg-vivid-pink text-white' : ''} rounded underline hover:cursor-pointer`" ></a>
                      <span v-if="content.citation > -1">)</span>
                      &nbsp;
                    </template>
                  </p>
                  <div v-for="subsection in section.subsections">
                    <h4 class="text-lg font-medium mt-1 mb-1" v-text="subsection.subsection_title"></h4>
                    <p class="px-5 py-1">
                      <template v-for="sub_content in subsection.subsection_content">
                          {{ sub_content.sentence }}
                      </template>
                    </p>
                  </div>
                </div>
                <div v-if="essay.references">
                  <h2 class="text-2xl font-medium mt-5 mb-3 px-1" v-text="`References:`"></h2>
                  <p class="py-1" v-for="reference in essay.references" v-text="reference"></p>
                </div>
                <div class="py-5"></div>
              </template>
              <div class="flex justify-center items-center">
                <button v-if="showContinue" @click="fetchEssay" class="px-4 py-2 mx-1 btn-sm rounded-full bg-primary-600 text-white border border-primary-600">Generate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="`right-section w-[500px] max-sm:w-full max-sm:pt-10 border-l ${isRightDrawerOpen ? '' : 'hidden'} transition duration-300 ease-in-out flex flex-col`">
        <div>
          <h1 v-if="rightTabIndex === 0" :class="`w-full px-5 py-5 text-lg max-sm:py-1 flex justify-center items-center font-bold ${connected ? 'text-slate-700' : 'text-red-700'}`"><IconBookOpen class="w-6 h-6 mr-1" />Overview</h1>
          <h1 v-if="rightTabIndex === 1" :class="`w-full px-5 py-5 text-lg max-sm:py-1 flex justify-center items-center font-bold ${connected ? 'text-slate-700' : 'text-red-700'}`"><IconLightingVolt class="w-6 h-6 mr-1" />Citation</h1>
          <h1 v-if="rightTabIndex === 2" :class="`w-full px-5 py-5 text-lg max-sm:py-1 flex justify-center items-center font-bold ${connected ? 'text-slate-700' : 'text-red-700'}`"><IconWandMagic class="w-6 h-6 mr-1" />AI Detection</h1>
        </div>
        <div class="flex-1 overflow-y-auto p-3">
<!--          <div class="hover:cursor-pointer w-full border bg-white shadow text-sm rounded-lg border-slate-300 px-3 py-1">-->
<!--            Can you explain the concept of "attention" in neural networks and how it is used in machine learning applications?-->
<!--          </div>-->
          <AccordionOverview
              v-if="rightTabIndex === 0"
              v-for="(section, index) in essay?.sections"
              :key="index"
              :id = "index"
              :item="section"
              @selectOne="selectOne"
              :selectedId = "selectedId"
          />
          <AccordionCitation
              v-if="rightTabIndex === 1"
              v-for="(section, index) in essay?.sections"
              :key="index"
              :id = "index"
              :item="section"
              @selectOne="selectOne"
              :selectedId = "selectedId"
              :references="essay?.reference_result"
          />
          <div v-if="rightTabIndex === 2">
            <div class="p-3">
              <h2 class="text-slate-600 mb-2">Bypass AI Detectors</h2>
              <div class="flex gap-2">
                <div class="flex py-4 px-2 bg-red-50 rounded-xl gap-1">
                  <div class="w-16"><img src="/public/imgs/AI_detect_icon.png" class="w-full h-full" alt="AI Icon"></div>
                  <div class="flex flex-col justify-between">
                    <p>AI-Like-Text</p>
                    <p v-text="`00${getLikeRate}%`"></p>
                  </div>
                </div>
                <div class="flex-1 py-4 px-2 bg-red-50 rounded-xl">
                  <div class="flex justify-center gap-3">
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      Tunitin <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      GPTZero <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                  </div>
                  <div class="flex justify-center gap-3">
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      ZeroGPT <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      OpenAI <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                  </div>
                  <div class="flex justify-center gap-3">
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      Copyleaks <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                    <p class="flex-1 flex justify-end items-center text-slate-700 text-right">
                      Scribbr <IconMinusCircle class="w-5 ml-2 text-green-600" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
<!--          <div v-if="rightTabIndex === 2" class="p-3 bg-white relative">-->
<!--            <textarea class="w-full h-28 border border-slate-200 rounded-lg text-sm px-3 py-2" placeholder="Ask bot a question..."></textarea>-->
<!--            <button class="bg-white border-slate-300 text-slate-700 border rounded h-8 w-8 absolute bottom-[25px] left-[20px] flex items-center justify-center hover:bg-slate-200"><IconAtSign class="w-4 h-4" /></button>-->
<!--            <button class="bg-slate-200 text-slate-700 border rounded text-sm h-8 w-20 absolute bottom-[25px] right-[20px] flex items-center justify-center hover:bg-white hover:border hover:text-slate-700">Send <IconPaperPlain class="w-4 h-4 ml-2 rotate-90 text-slate-600" /></button>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </main>
  <!-- Start -->
<!--  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" aria-controls="success-modal" @click.stop="continueModalOpen = true">Success Modal</button>-->
  <ModalBlank id="continue-modal" :modalOpen="continueModalOpen" @close-modal="continueModalOpen = false">
    <div class="p-5 flex space-x-4">
      <!-- Icon -->
      <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 dark:bg-emerald-400/30">
        <svg class="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z" />
        </svg>
      </div>
      <!-- Content -->
      <div class="flex-1">
        <!-- Modal header -->
        <div class="mb-2">
          <div class="text-xl font-semibold text-slate-800" v-text="essay?.title"></div>
        </div>
        <!-- Modal content -->
        <div class="text-sm mb-10">
          <div class="space-y-2">
            <p>Do you want to continue to generate this?</p>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="px-4 py-2 mx-1 border rounded-full btn-sm border-slate-200 hover:bg-slate-300 text-slate-600" @click.stop="continueModalOpen = false">Cancel</button>
          <button class="px-4 py-2 mx-1 btn-sm rounded-full bg-indigo-500 hover:bg-indigo-600 text-white" @click="fetchEssay">Yes, I agree!</button>
        </div>
      </div>
    </div>
  </ModalBlank>
  <!-- Start -->
  <ModalBlank id="setting-modal" :modalOpen="settingModalOpen" @close-modal="settingModalOpen = false">
    <div class="px-10 py-6 flex space-x-4">
      <!-- Content -->
      <div class="flex-1">
        <!-- Modal header -->
        <div class="mb-4">
          <div class="text-xl font-semibold text-slate-800">Document Setting</div>
        </div>
        <!-- Modal content -->
        <div class="">
          <label>Document Prompt</label>
          <textarea class="w-full rounded-lg p-3 h-26 border"></textarea>
        </div>
        <div class="mb-8">
          <div class="flex justify-between items-center mb-3">
            <label>Language</label>
            <select class="p-2 border rounded w-44">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>
          <div class="flex justify-between items-center mb-3">
            <label>Citation</label>
            <select class="p-2 border rounded w-44">
              <option>APA</option>
              <option>MLA</option>
              <option>APA 7</option>
              <option>APA 7</option>
              <option>APA 7</option>
            </select>
          </div>
          <div class="flex justify-between items-center">
            <label>Auto-complete</label>
            <!-- Start -->
            <div class="form-switch">
              <input type="checkbox" id="autoCompleteSetting" class="sr-only" v-model="autoCompleteSetting" true-value="On" false-value="Off" />
              <label class="bg-slate-400" for="autoCompleteSetting">
                <span class="bg-white shadow-sm" aria-hidden="true"></span>
                <span class="sr-only">Toggle</span>
              </label>
            </div>
            <!-- End -->
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="px-4 py-2 mx-1 border rounded-full btn-sm border-slate-200 text-slate-600" @click.stop="settingModalOpen = false">Cancel</button>
          <button class="px-6 py-2 mx-1 btn-sm rounded-full bg-bright-red text-white">Ok</button>
        </div>
      </div>
    </div>
  </ModalBlank>
  <!-- Start -->
  <!-- Start -->
  <ModalBlank id="billing-modal" :modalOpen="billingModalOpen" @close-modal="billingModalOpen = false">
    <div class="px-10 py-6 flex space-x-4">
      <!-- Content -->
      <div class="flex-1">
        <!-- Modal header -->
        <div class="mb-4">
          <div class="text-xl font-semibold text-slate-800 mb-2">Manage Subscription</div>
          <div class="text-lg text-slate-600">Update payment information or make changes to your active plan.</div>
        </div>
        <!-- Modal content -->
        <div class="mb-5 text-slate-800">
          <div class="flex items-center gap-2 my-2"><h2 class="text-lg font-semibold">Your Plan</h2> <span class="bg-emerald-200 px-3 py-1 rounded-full text-sm text-slate-600"> <span class="text-emerald-600">&#x25CF;</span> Active</span></div>
<!--          <div class="free flex flex-col gap-2">-->
<!--            <h2>FREE</h2>-->
<!--            <p>Get unlimited goodpen access for 1 month for $19 or 12 month for $136. Annual billing reduces your average monthly price by 40%</p>-->
<!--            <div class="flex items-center gap-5 mt-2">-->
<!--              <button class="bg-white h-9 px-5 flex justify-center items-center border rounded-full">Switch to Monthly</button>-->
<!--              <button class="bg-white h-9 px-5 flex justify-center items-center border rounded-full">Switch to Annual</button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="month flex flex-col gap-2">-->
<!--            <h2>Unlimited (Monthly)</h2>-->
<!--            <p>Get unlimited goodpen access for 12 month for $136. Annual billing reduces your average monthly price by 40%</p>-->
<!--            <div class="flex items-center gap-5 mt-2">-->
<!--              <button class="bg-white h-9 px-5 flex justify-center items-center border rounded-full">Switch to Annual</button>-->
<!--            </div>-->
<!--          </div>-->
          <div class="year flex flex-col gap-2">
            <h2>Unlimited (Annual)</h2>
            <p>You have access goodpen access for 12 month for $136. Annual billing reduces your average monthly price by 40%</p>
            <div class="flex items-center gap-5 mt-2">
              <button class="bg-white h-9 px-5 flex justify-center items-center border rounded-full">Switch to Annual</button>
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex flex-wrap justify-end space-x-2">
          <button class="px-6 py-2 mx-1 btn-sm rounded-full bg-bright-red text-white">Visit Billing Centre</button>
        </div>
      </div>
    </div>
  </ModalBlank>
  <!-- Start -->
  <ModalAction id="generate-modal" :modalOpen="generateModalOpen" @close-modal="generateModalOpen = false">
    <!-- Modal header -->
    <div class="mt-2 mb-4 text-center">
      <!-- Icon -->
      <div class="text-2xl font-semibold text-slate-800">What are you writing today?</div>
    </div>
    <!-- Modal content -->
    <div class="text-center">
      <!-- Submit form -->
      <form class="max-w-sm m-auto">
        <input v-model="essayTitle" class="w-full border-2 rounded-lg text-slate-800 px-3 py-3 mb-2" placeholder="Challenges of a Professional Relationship">
        <div class="flex justify-between mb-4">
          <div class="flex items-center">
            <button type="button" @click="viewMore = !viewMore" class="flex items-center">More <IconChevronDown class="w-4 h-4 ml-2" :class="{ 'rotate-180': viewMore }" /></button>
          </div>
          <div class="flex gap-2">
            <label>Number of words:</label>
            <select class="text-right" v-model="numOfWords">
              <option>500</option>
              <option>1000</option>
              <option>1500</option>
              <option>2000</option>
              <option>3000</option>
              <option>5000</option>
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-2 pb-5" v-if="viewMore">
          <div class="flex flex-col gap-1">
            <label class="w-full text-left">Instructions</label>
            <textarea class="w-full border border-slate-200 rounded-lg h-32 px-3 py-2" v-model="instructions" placeholder="Help GoodPen get you the best results by including instructions and requirements of the paper."></textarea>
          </div>
          <div class="flex justify-between w-full text-slate-700 px-3">
            <label>Citation Style:</label>
            <select class="text-right" v-model="citation">
              <option>MLA</option>
              <option>APA</option>
              <option>Harvard</option>
              <option>Oxford</option>
            </select>
          </div>
          <div class="flex justify-between w-full text-slate-700 px-3">
              <label>Academic Level</label>
              <select class="text-right" v-model="academic">
                <option>High School</option>
                <option>College</option>
                <option>Master</option>
                <option>Doctoral</option>
              </select>
          </div>
          <div class="flex justify-between w-full text-slate-700 px-3">
            <label>Essay Type</label>
            <select class="text-right" v-model="essayType">
              <option>Generic</option>
              <option>Research</option>
              <option>Admission</option>
              <option>Analytical</option>
              <option>Argumentive</option>
              <option>Biography</option>
            </select>
          </div>
          <div class="flex justify-between w-full text-slate-700 px-3">
              <label>Language</label>
              <select class="text-right" v-model="lang">
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
          </div>
        </div>

        <button type="button" @click="generateEssay" class="h-9 w-full px-5 flex justify-center items-center border border-slate-600 rounded-full text-slate-800">Generate</button>
      </form>
      <div class="max-w-sm m-auto text-slate-500 italic mt-3">
        <div class="relative">
          <div class="w-full h-2 bg-slate-200 rounded-full"></div>
          <div class="absolute top-0 h-2 rounded-full" :class="promptClasses"></div>
        </div>
        {{promptText.status}} prompt: {{promptText.note}}
      </div>
    </div>
  </ModalAction>
  <!-- End -->
  <!-- Modal Start -->
  <ModalBasic id="plan-modal" :modalOpen="planModalOpen" @close-modal="planModalOpen = false" title="Change your Plan">
    <!-- Modal content -->
    <div class="px-5 pt-4 pb-1">
      <div class="text-sm">
        <div class="mb-4">Upgrade or downgrade your plan:</div>
        <!-- Options -->
        <ul class="space-y-2 mb-4">
          <li>
            <button @click="setPlan(0)" :class="`w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out border-2 ${plan === 0 ? 'border-indigo-400' : 'border-slate-300 hover:border-slate-300'}`">
              <div class="flex items-center">
                <div :class="`w-4 h-4 ${plan === 0 ? 'border-4 bg-white border-indigo-500' : 'border-2 border-slate-300'} rounded-full mr-3`"></div>
                <div class="grow">
                  <div class="flex flex-wrap items-center justify-between mb-0.5">
                    <span class="font-medium text-slate-800">Trial plan <span class="text-xs italic text-slate-500 align-top">Current Plan</span></span>
                    <span class="text-slate-600"><span class="font-medium text-emerald-600">Free</span></span>
                  </div>
                  <div class="text-sm">Free version</div>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button @click="setPlan(1)" :class="`w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out border-2 ${plan === 1 ? 'border-indigo-400' : 'border-slate-300 hover:border-slate-300'}`">
              <div class="flex items-center">
                <div :class="`w-4 h-4 ${plan === 1 ? 'border-4 bg-white border-indigo-500' : 'border-2 border-slate-300'} rounded-full mr-3`"></div>
                <div class="grow">
                  <div class="flex flex-wrap items-center justify-between mb-0.5">
                    <span class="font-semibold text-slate-800">Monthly plan</span>
                    <span class="text-slate-600"><span class="font-medium text-emerald-600">$19.00</span>/month</span>
                  </div>
                  <div class="text-sm">Unlimited AI generation</div>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button @click="setPlan(2)" :class="`w-full h-full text-left py-3 px-4 rounded bg-white shadow-sm duration-150 ease-in-out border-2 ${plan === 2 ? 'border-indigo-400' : 'border-slate-300 hover:border-slate-300'}`">
              <div class="flex items-center">
                <div :class="`w-4 h-4 ${plan === 2 ? 'border-4 bg-white border-indigo-500' : 'border-2 border-slate-300'} rounded-full mr-3`"></div>
                <div class="grow">
                  <div class="flex flex-wrap items-center justify-between mb-0.5">
                    <span class="font-semibold text-slate-800">Yearly plan <span class="text-xs italic text-indigo-500 align-top">Best Value ✨</span></span>
                    <span class="text-slate-600"><span class="font-medium text-emerald-600">$136.00</span>/year</span>
                  </div>
                  <div class="text-sm">Unlimited AI generation</div>
                </div>
              </div>
            </button>
          </li>
        </ul>
        <div class="text-xs text-slate-500" v-text="planEnds[plan]"></div>
      </div>
    </div>
    <!-- Modal footer -->
    <div class="px-5 py-4">
      <div class="flex flex-wrap justify-end space-x-2">
        <button class="h-9 px-5 flex justify-center items-center border rounded-full" @click.stop="planModalOpen = false">Cancel</button>
        <button @click="submitPlan" class="px-4 py-2 mx-1 border rounded-full bg-bright-red text-white text-sm flex items-center">Change Plan</button>
      </div>
    </div>
  </ModalBasic>
  <!-- Modal End -->
</template>
<script>
import { socket, state } from "@/socket";
import {ref} from "vue";
import { useRoute } from 'vue-router'
import {apis} from "@/apis";
import { useToast } from "vue-toastification";
const toast = useToast();

const essayContainer = ref(null);

export default {
  data() {
    const route = useRoute()
    return {
      query: route.query,
      // Essay
      essayTitle: "",
      lang: "English",
      citation: "MLA",
      academic: "College",
      essayType: "Research",
      instructions: "",
      numOfWords: 500,

      selectedEssay: undefined,

      wordCnt: 0,
      wordLimitedCnt: 200,

      plan: 0,
      rightTabIndex: 0,
      selectedId: -1,

      isLeftDrawerOpen: true,
      isRightDrawerOpen: false,
      planModalOpen: false,
      generateModalOpen: false,
      settingModalOpen: false,
      billingModalOpen: false,
      viewMore: false,
      showContinue: false,

      autoCompleteSetting: 'On',

      loader: undefined,

      selectedOneToExport: undefined,
      chooseFileTypeOpen: false,
      fileType: 'PDF'
    }
  },
  methods: {
    openBillingModal() {
      this.billingModalOpen = true
    },
    exportOne(id, title, type) {
      if (!id) {
        toast.warning("Something's wrong, please try again!")
      } else {
        let txt = this.essay.title + '\n\n'
        this.essay.sections.forEach(section => {
          txt += '\n\n' + section.section_title + '\n\n'
          section.section_content.forEach(content => {
            txt += content.sentence + '\n'
          })
          section.subsections.forEach(subsection => {
            txt += '\n\n' + subsection.subsection_title + '\n\n'
            subsection.subsection_content.forEach(sub_content => {
              txt += sub_content.sentence + '\n'
            })
          })
        })
        this.essay.references.forEach(reference => {
          txt += reference + '\n'
        })
        if (type === 'clip') {
          navigator.clipboard.writeText(txt)
              .then(function() {
                toast.success('The document has been copied!');
              })
              .catch(function(error) {
                toast.error('Failed to copy: ', error);
              });
        } else {
          if (type === 'doc') {
            this.exportEssay(id, title, 'PDF')
          } else {
            this.exportEssay(id, title, 'DOC')
          }
        }
        this.chooseFileTypeOpen = false;
      }
    },
    exportEssay(id, title, type) {
      const server = import.meta.env.VITE_SERVER_URL
      fetch( `${server}/api/v1/documents/${id}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ type: type }), // Specify the type of file you want to download
      })
          .then(async (response) => {
            if(response.status === 200) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(new Blob([blob]));
              const a = document.createElement('a');
              a.href = url;
              const ext = type === 'PDF' ? '.pdf' : '.docx'
              a.download = title + ext; // Specify the filename here
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              toast.error("The document has some issues, please regenerate!");
            }
          })

    },
    deleteOne(id) {
      apis.deleteOne(id).then(res => {
        this.$store.dispatch('essay/removeEssayById', id)
        if (id === this.essay.id) {
          this.fetchFullEssay(this.essayArr[0].id)
        }
        toast.success("The document has been deleted successfully!");
      }).catch(err => {
        toast.error(err.response.data.message)
      })
    },
    selectOne(id) {
      this.selectedId = id
    },
    submitPlan() {
      switch (this.plan) {
        case 0: toast.info("You didn't select product version!"); break;
        case 1: {
          this.$store.dispatch('stripe/checkout', 1)
          // window.location.href = 'https://buy.stripe.com/test_4gwdSQ38b2EQgKI8ww'
        } break;
        case 2: {
          this.$store.dispatch('stripe/checkout', 2)
          // window.location.href = 'https://buy.stripe.com/test_28o1645gjgvGfGE7st'
        } break;
      }
    },
    setPlan(num) {
      this.plan = num
    },
    toggleLeftDrawer() {
      this.isLeftDrawerOpen = !this.isLeftDrawerOpen
    },
    toggleRightDrawer() {
      this.isRightDrawerOpen = !this.isRightDrawerOpen
    },
    generateEssay() {
      if (!this.generating) {
        if(!this.essayTitle) toast.info("Please enter essay title!")
        else if (this.user.plan.type === "FREE" && this.user.plan.quotaUsage === 500) {
          toast.warning("You are reached limited word usage, please upgrade your version!")
          // this.generateModalOpen = false
          this.planModalOpen = true
        }
        else {
          this.generateModalOpen = false
          this.$store.dispatch('essay/formatEssay')
          toast.info("Writing started, please wait...")
          this.loader = this.$loading.show({
            // Optional parameters
            container: null,
            canCancel: true,
            onCancel: this.onCancel,
          });
          const args = {
            "essay_title": this.essayTitle,
            "num_of_words": this.numOfWords,
            "citation": this.citation,
            "level": this.academic,
            "essay_type": this.essayType,
            "language": this.lang,
            "instructions": this.instructions
          };
          socket.emit("generate-essay", {
            user_id: this.user.id,
            essay: args
          });
        }
      }
    },
    fetchEssay() {
      this.continueModalOpen = false;
      this.showContinue = false;
      // this.document.index += 1;
      apis.fetchDocument(this.document).then(res => {
        this.$store.dispatch('essay/setEssay', res['data']['essay']).then(() => {
          this.wordCnt = res['data']['quotaUsage'];
          if (this.wordCnt < this.wordLimitedCnt) this.showContinue = true;
          else {
            this.planModalOpen = true;
          }
          this.$nextTick(() => {
            if (essayContainer.value) essayContainer.value.scrollTop = essayContainer.value.scrollHeight;
          });
        })
      })
    },
    fetchFullEssay(id) {
      this.loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      apis.fetchFullEssay(id).then(res => {
        this.$store.dispatch('essay/setEssay', res['data']['essay'])
        console.log('Essay: ', res['data']['essay'])

        if (!localStorage.getItem(res['data']['essay']['title'])) localStorage.setItem(res['data']['essay']['title'], Math.floor((Math.random() * 5) + 1))
        // this.document = res['data']['document']
        this.$store.dispatch('auth/getAuth').then(res => {
          this.loader.hide();
          if (res.data.user.plan.quotaUsage === 500 && res.data.user.plan.type === 'FREE') {
            toast.warning("You have reached limited word usage, please upgrade your version")
            this.planModalOpen = true;
          }
        })
      }).catch(err => {
        this.loader.hide();
        toast.error("This document was damaged by accident, please regenerate it")
      })

    },
    truncateText(text) {
      if (text.length > 20) {
        return text.substring(0, 20) + '..';
      }
      return text;
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    connected() {
      return state.connected;
    },
    generating() {
      return this.$store.state.essay.generating;
    },
    essay() {
      return this.$store.state.essay.essay;
    },
    essayArr() {
      return this.$store.state.essay.essayArr;
    },
    loggedIn() {
      return localStorage.getItem('token') !== null;
    },
    getLikeRate() {
      if (!localStorage.getItem(this.essay.title)) {
        localStorage.setItem(this.essay.title, Math.floor((Math.random() * 5) + 1));
      }
      else return localStorage.getItem(this.essay.title)
    },
    planEnds() {
      const today = new Date();
      const next15Days = new Date(today.setDate(today.getDate() + 15));
      const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
      const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));

      return [
        `Your workspace’s plan is set to free version.`,
        `Your workspace’s plan is set to free and will be finished on ${nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`,
        `Your workspace’s plan is set to free and will be finished on ${nextYear.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`,
      ];
    },
    limitClasses() {
      const rate = this.wordCnt / this.wordLimitedCnt;
      if (rate >= 1) return 'bg-bright-red w-full';
      else if (rate >= 11/12) return 'bg-yellow-600 w-11/12';
      else if (rate >= 10/12) return 'bg-yellow-500 w-10/12';
      else if (rate >= 9/12) return 'bg-yellow-400 w-9/12';
      else if (rate >= 8/12) return 'bg-yellow-400 w-8/12';
      else if (rate >= 7/12) return 'bg-yellow-400 w-7/12';
      else if (rate >= 6/12) return 'bg-vivid-pink w-6/12';
      else if (rate >= 5/12) return 'bg-vivid-pink w-5/12';
      else if (rate >= 4/12) return 'bg-vivid-pink w-4/12';
      else if (rate >= 3/12) return 'bg-vivid-pink w-3/12';
      else if (rate >= 2/12) return 'bg-vivid-pink w-2/12';
      else if (rate >= 1/12) return 'bg-vivid-pink w-1/12';
      else return 'bg-primary-900 hidden';
    },
    promptClasses () {
      const len = this.instructions.trim().split(/\s+/).filter(function(n) { return n !== '' }).length;
      if (len >= 20) return 'bg-emerald-500 w-full';
      else if (len >= 18) return 'bg-emerald-500 w-11/12';
      else if (len >= 16) return 'bg-emerald-500 w-10/12';
      else if (len >= 14) return 'bg-emerald-500 w-9/12';
      else if (len >= 12) return 'bg-emerald-500 w-8/12';
      else if (len >= 10) return 'bg-yellow-500 w-7/12';
      else if (len >= 8) return 'bg-yellow-500 w-6/12';
      else if (len >= 6) return 'bg-yellow-500 w-5/12';
      else if (len >= 4) return 'bg-red-400 w-4/12';
      else if (len >= 3) return 'bg-red-400 w-3/12';
      else if (len >= 2) return 'bg-red-400 w-2/12';
      else if (len >= 1) return 'bg-red-400 w-1/12';
      else return 'bg-red-400 hidden';
    },
    promptText () {
      const len = this.instructions.trim().split(/\s+/).filter(function(n) { return n !== '' }).length;
      if (len >= 10) return {
        status: 'Great ',
        note: 'GoodPen will reference this when generating text'
      };
      else if (len > 5) return {
        status: 'Average',
        note: 'consider including important keywords'
      };
      else return {
        status: 'Weak',
        note: 'add more context for higher quality generations'
      };
    }

  },
  // beforeCreate() {
  //   this.loader = this.$loading.show({
  //     // Optional parameters
  //     container: null,
  //     canCancel: true,
  //     onCancel: this.onCancel,
  //   });
  // },
  mounted() {
    if (this.query.session_id !== undefined) {
      apis.checkoutSuccess({sessionId: this.query.session_id}).then(res => {
        this.$router.push('/generate');
        this.$store.dispatch('auth/getAuth')
      })
    }

    apis.fetchDocuments().then(res => {
      this.$store.dispatch('essay/setEssayArr', res.data.documents);
      if (res.data.documents.length) {
        apis.fetchFullEssay(res.data.documents[0].id).then(res => {
          toast.success("Your last essay has been fetched!")
          this.$store.dispatch('essay/setEssay', res['data']['essay'])
        })
      } else {
        toast.info('We can help you to write perfect essay!')
        this.generateModalOpen = true;
      }
    })

    this.$store.dispatch('auth/getAuth').then(res => {
      let tempCnt = res.data.user.plan.quotaUsage;
      if (tempCnt > 500) tempCnt = 500;
      this.wordCnt = tempCnt;
    }).catch(error => {
      console.error('Failed to authenticate: ', error);
      toast.error("Failed to authenticate, please login again!")
    });

    socket.on("get-essay", res => {
      if (this.user.plan.type === 'UNLIMITED') {
        this.$store.dispatch('essay/setEssay', res['essay']).then(() => {
          this.$nextTick(() => {
            if (essayContainer.value) essayContainer.value.scrollTop = essayContainer.value.scrollHeight;
          });
        });
        if (res['status'] === 2) {
          this.$store.dispatch('essay/addEssay', res['essay'])
          this.essayTitle = ""
          this.loader.hide()
        }
      } else {
        this.$store.dispatch('essay/setEssay', res['essay']).then(() => {
          this.wordCnt = res['quotaUsage']
          this.$nextTick(() => {
            if (essayContainer.value) essayContainer.value.scrollTop = essayContainer.value.scrollHeight;
          });
        });
        if (res['status'] === 1) {
          this.$store.dispatch('essay/addEssay', res['essay'])
          this.wordCnt = res['quotaUsage']
          this.loader.hide();
          toast.warning("You have been reached to limited word count!, please upgrade your version!")
          this.planModalOpen = true
        } else if (res['status'] === 2) {
          this.$store.dispatch('essay/addEssay', res['essay'])
          this.loader.hide()
          toast.success(`"Essay has been successfully generated!`)
        }
        this.essayTitle = ""
      }
    });
  }
};
</script>
<script setup>
import Button from "@/components/Button.vue";
import IconLightingVolt from "@/components/icons/IconLightingVolt.vue";
import IconBadgeCheck from "@/components/icons/IconBadgeCheck.vue";
import IconArrowBackUp from "@/components/icons/IconArrowBackUp.vue";
import IconArrowForwardUp from "@/components/icons/IconArrowForwardUp.vue";
import IconWandMagic from "@/components/icons/IconWandMagic.vue";
import IconBookOpen from "@/components/icons/IconBookOpen.vue";
import IconLogin from "@/components/icons/IconLogin.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconCirclePlus from "@/components/icons/IconCirclePlus.vue";
import IconSquarePlus from "@/components/icons/IconSquarePlus.vue";
import IconAtSign from "@/components/icons/IconAtSign.vue";
import IconPaperPlain from "@/components/icons/IconPaperPlain.vue";
import Header from "@/layouts/Header.vue";
import Logo from "@/components/icons/Logo.vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import ModalBasic from "@/components/ModalBasic.vue";
import IconChevronsLeft from "@/components/icons/IconChevronsLeft.vue";
import IconChevronsRight from "@/components/icons/IconChevronsRight.vue";
import DropdownProfile from "@/components/DropdownProfile.vue";
import ModalAction from "@/components/ModalAction.vue";
import IconChevronDown from "@/components/icons/IconChevronDown.vue";
import ModalBlank from "@/components/ModalBlank.vue";
import AccordionOverview from "@/components/AccordionOverview.vue";
import AccordionCitation from "@/components/AccordionCitation.vue";
import IconMinusCircle from "@/components/icons/IconMinusCircle.vue";
import Loading from "vue-loading-overlay";
import ModalFileType from "@/components/ModalFileType.vue";
import IconSetting from "@/components/icons/IconSetting.vue";
</script>