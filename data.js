// Trustpilot Help Center structure.
// Each node: { id, label, type, url?, keywords?, children? }
// type: "home" | "audience" | "topic" | "subtopic" | "article"
// keywords: optional extra search terms besides the label itself.
//
// NOTE on unmapped nodes: some subtopics below have empty children arrays
// because we've only seen their parent topic's card preview, not their
// full page yet. Send the follow-up screenshots and we'll fill these in.

const TREE_DATA = {
  id: "home",
  label: "Trustpilot Help Center",
  type: "home",
  children: [
    {
      id: "reviewer",
      label: "For Reviewers",
      type: "audience",
      children: [
        // --- Landing page "featured" quick links (3 cards at top of /reviewer page) ---
        // Confirmed: separate curated section from "Browse by topic" below.
        {
          id: "rev-featured",
          label: "Featured (landing page quick links)",
          type: "featured",
          children: [
            {
              id: "rev-new-to-tp",
              label: "New to Trustpilot",
              type: "quicklink",
              children: [
                { id: "rev-who-can-write-review", label: "Who can write a review", type: "article" },
                { id: "rev-quick-start-guide", label: "Quick start guide", type: "article" },
                { id: "rev-create-a-profile-featured", label: "Create a profile", type: "article" }
              ]
            },
            {
              id: "rev-reviews-101",
              label: "Trustpilot reviews 101",
              type: "quicklink",
              children: [
                { id: "rev-write-a-review", label: "Write a review", type: "article" },
                { id: "rev-edit-or-delete-review", label: "Edit or delete a review", type: "article", keywords: ["delete review"] },
                { id: "rev-tips-writing-reviews", label: "Tips for writing reviews", type: "article" }
              ]
            },
            {
              id: "rev-how-to-use-tp",
              label: "How to use Trustpilot",
              type: "quicklink",
              children: [
                { id: "rev-discover-new-businesses", label: "Discover new businesses", type: "article" },
                { id: "rev-tips-using-tp-featured", label: "Tips for using Trustpilot", type: "article" },
                { id: "rev-shop-smarter", label: "Shop smarter using reviews", type: "article" }
              ]
            }
          ]
        },

        // --- "Browse by topic" section (full topic list) ---
        { id: "rev-announcements", label: "Announcements", type: "topic", children: [] },

        {
          id: "rev-about-trustpilot",
          label: "About Trustpilot",
          type: "topic",
          children: [
            {
              id: "rev-contact-us",
              label: "Contact Us",
              type: "subtopic",
              children: [
                { id: "rev-add-attachments-email", label: "Add attachments to an email", type: "article" },
                { id: "rev-eu-dsa-contact-points", label: "EU Digital Services Act: Contact points on Trustpilot", type: "article" },
                { id: "rev-appeal-content-integrity", label: "How can I appeal a decision made by the Content Integrity Team?", type: "article" },
                { id: "rev-how-contact-tp", label: "How do I contact Trustpilot?", type: "article" },
                { id: "rev-how-take-screenshot", label: "How to take a screenshot", type: "article" }
              ]
            },
            {
              id: "rev-how-tp-works-for-you",
              label: "How Trustpilot works for you",
              type: "subtopic",
              children: [
                { id: "rev-businesses-pay", label: "Do businesses pay to use Trustpilot?", type: "article" },
                { id: "rev-reviews-improve-shopping", label: "How can reviews improve your online shopping experiences?", type: "article" },
                { id: "rev-business-model", label: "How does Trustpilot's business model work?", type: "article" }
              ]
            }
          ]
        },

        {
          id: "rev-create-your-profile",
          label: "Create your profile",
          type: "topic",
          // Confirmed: no subtopic layer here, articles sit directly under the topic.
          children: [
            { id: "rev-change-profile-picture", label: "Change or remove your profile picture", type: "article" },
            { id: "rev-choose-username", label: "Choose a username", type: "article" },
            { id: "rev-create-reviewer-profile", label: "Create a Trustpilot reviewer profile", type: "article" },
            { id: "rev-tips-using-tp-profile", label: "Tips for using Trustpilot", type: "article" },
            { id: "rev-verify-identity-photo-id", label: "Verify your identity with photo ID", type: "article" }
          ]
        },

        // Confirmed: 3 subtopics, plus 1 article that sits directly under the topic
        // (mixed children - subtopics and an article as siblings).
        {
          id: "rev-navigating-trustpilot",
          label: "Navigating Trustpilot",
          type: "topic",
          children: [
            {
              id: "rev-social-sharing",
              label: "Social sharing",
              type: "subtopic",
              children: [
                { id: "rev-share-your-reviews", label: "Share your Trustpilot reviews", type: "article" }
              ]
            },
            {
              id: "rev-searching-on-tp",
              label: "Searching on Trustpilot",
              type: "subtopic",
              children: [
                { id: "rev-find-explore-categories", label: "Find and explore categories", type: "article" },
                { id: "rev-chrome-extension", label: "Trustpilot's Google Chrome Extension", type: "article" }
              ]
            },
            {
              id: "rev-business-profile-pages",
              label: "Business profile pages and review labels",
              type: "subtopic",
              children: [
                { id: "rev-company-activity", label: "Company activity - See how every business uses Trustpilot", type: "article" },
                { id: "rev-filter-business-reviews", label: "Filter a business's reviews", type: "article" },
                { id: "rev-merged-business-profiles", label: "Merged business profiles on Trustpilot", type: "article" },
                { id: "rev-verified-label", label: "Why are some reviews marked \"Verified\"?", type: "article", keywords: ["verified"] }
              ]
            },
            { id: "rev-trust-reviews-on-websites", label: "Can I trust Trustpilot reviews on business websites?", type: "article" }
          ]
        },

        // Confirmed: no subtopics, 6 articles directly under the topic.
        {
          id: "rev-your-tp-account",
          label: "Your Trustpilot account",
          type: "topic",
          children: [
            {
              id: "rev-reset-password",
              label: "Change or reset your Trustpilot user account password",
              type: "article",
              keywords: ["password", "forgot password", "reset password", "user password"]
            },
            { id: "rev-change-account-email", label: "Change your Trustpilot reviewer account email", type: "article", keywords: ["email"] },
            { id: "rev-delete-reviewer-account", label: "Delete your Trustpilot reviewer account", type: "article", keywords: ["delete account"] },
            { id: "rev-cant-log-in", label: "I can't log in to my reviewer account", type: "article", keywords: ["login", "log in", "can't log in"] },
            { id: "rev-two-profiles-merge", label: "I have two user profiles on Trustpilot. Can I merge them?", type: "article", keywords: ["merge accounts"] },
            { id: "rev-manage-personal-email-settings", label: "Manage your personal and email settings", type: "article" }
          ]
        },

        {
          id: "rev-writing-reviews-topic",
          label: "Writing Reviews",
          type: "topic",
          children: [
            {
              id: "rev-how-to-write-reviews",
              label: "How to write reviews",
              type: "subtopic",
              children: [
                { id: "rev-be-first-to-review", label: "Be the first to review a business", type: "article" },
                { id: "rev-review-business-multiple-times", label: "Review a business multiple times", type: "article" },
                { id: "rev-write-a-review-2", label: "Write a review", type: "article" }
              ]
            },
            {
              id: "rev-manage-edit-reviews",
              label: "Manage and Edit your reviews",
              type: "subtopic",
              children: [
                { id: "rev-edit-delete-your-review", label: "Edit or delete your review", type: "article" },
                { id: "rev-find-manage-reviews", label: "Find and manage your reviews", type: "article" },
                { id: "rev-find-respond-review-invitations", label: "Find and respond to your review invitations", type: "article" },
                { id: "rev-delete-product-review-media", label: "How to delete your product review picture or video", type: "article" }
              ]
            },
            {
              id: "rev-tips-subtopic",
              label: "Tips",
              type: "subtopic",
              children: [
                { id: "rev-photos-videos-product-reviews", label: "How to take photos and videos for product reviews", type: "article" },
                { id: "rev-tips-location-reviews", label: "Tips for writing location reviews", type: "article" },
                { id: "rev-tips-product-reviews", label: "Tips for writing product reviews", type: "article" }
              ]
            },
            { id: "rev-who-can-write-review-when", label: "Who can write a review and when?", type: "article" }
          ]
        },

        {
          id: "rev-flagging",
          label: "Flagging",
          type: "topic",
          children: [
            {
              id: "rev-how-to-flag-review",
              label: "How to flag a review",
              type: "subtopic",
              children: [
                { id: "rev-misuse-flagging-tool", label: "How do we handle misuse of the review flagging tool for consumers?", type: "article" }
              ]
            },
            {
              id: "rev-review-was-flagged",
              label: "My review was flagged",
              type: "subtopic",
              children: [
                { id: "rev-asked-update-review-info", label: "I've been asked to update my review or provide more info", type: "article" }
              ]
            },
            {
              id: "rev-whistleblower",
              label: "Whistleblower",
              type: "subtopic",
              children: [
                { id: "rev-whistleblower-function", label: "Does Trustpilot have a whistleblower function?", type: "article" }
              ]
            }
          ]
        },

        {
          id: "rev-privacy",
          label: "Privacy",
          type: "topic",
          children: [
            { id: "rev-delete-review-invitations-data", label: "Delete your review invitations data", type: "article" },
            { id: "rev-access-download-correct-delete-personal-data", label: "How to access, download, correct, or delete your personal data", type: "article" },
            { id: "rev-gdpr-data-protection-businesses", label: "The GDPR and data protection requirements for businesses", type: "article", keywords: ["gdpr"] },
            { id: "rev-retention-period-reviews", label: "What's the retention period of reviews?", type: "article" }
          ]
        }
      ]
    },
    {
      id: "business",
      label: "For Businesses",
      type: "audience",
      children: [
        // --- Landing page "featured" quick links (3 cards at top of /business page) ---
        // "Getting started" CTA ("Let's go!") deep-links straight into the
        // "Getting started with Trustpilot Business" topic below - not modeled as a
        // separate node to avoid duplicating that subtree.
        // "New Shopify app" and "New releases" each contain exactly 1 article
        // (title not yet confirmed - send screenshots of those 2 pages).
        {
          id: "biz-featured",
          label: "Featured (landing page quick links)",
          type: "featured",
          children: [
            { id: "biz-new-shopify-app", label: "New Shopify app", type: "quicklink", children: [], keywords: ["upgrade now", "shopify"] },
            { id: "biz-new-releases", label: "New releases", type: "quicklink", children: [], keywords: ["learn more"] }
          ]
        },

        // --- "Browse by topic" section (10 topics confirmed) ---
        // Sub-items with no "ARTICLES" eyebrow label are modeled as subtopics
        // (same pattern as the reviewer side); children left empty pending
        // each topic's full detail page.
        {
          id: "biz-getting-started-topic",
          label: "Getting started with Trustpilot Business",
          type: "topic",
          children: [
            {
              id: "biz-starter-plan", label: "Starter plan", type: "subtopic",
              children: [{ id: "biz-starter-plan-article", label: "Getting started with Trustpilot's Starter plan", type: "article" }]
            },
            {
              id: "biz-premium-plan", label: "Premium plan", type: "subtopic",
              children: [{ id: "biz-premium-plan-article", label: "Getting started with Trustpilot's Premium plan", type: "article" }]
            },
            {
              id: "biz-plus-plan", label: "Plus plan", type: "subtopic",
              children: [{ id: "biz-plus-plan-article", label: "Getting started with Trustpilot's Plus plan", type: "article" }]
            },
            {
              id: "biz-free-plan", label: "Free plan", type: "subtopic",
              children: [{ id: "biz-free-plan-article", label: "Getting started with Trustpilot's Free plan", type: "article" }]
            }
          ]
        },
        {
          id: "biz-how-tp-works",
          label: "How Trustpilot works",
          type: "topic",
          children: [
            {
              id: "biz-about", label: "About", type: "subtopic",
              children: [
                { id: "biz-review-labels", label: "Trustpilot's review labels", type: "article" },
                { id: "biz-your-business-profile-page", label: "Your business profile page", type: "article" }
              ]
            },
            {
              id: "biz-protecting-platform", label: "Protecting the platform", type: "subtopic",
              children: [
                { id: "biz-eu-laws-reviews", label: "New EU laws on reviews - What they mean for businesses using Trustpilot", type: "article", keywords: ["eu laws"] },
                { id: "biz-teams-behind-trust", label: "Teams behind Trust at Trustpilot", type: "article" }
              ]
            },
            {
              id: "biz-help", label: "Help", type: "subtopic",
              children: [
                { id: "biz-contact-account-manager", label: "Contact your account manager", type: "article" },
                { id: "biz-how-to-contact-tp", label: "How to contact Trustpilot", type: "article" },
                { id: "biz-support-team", label: "Trustpilot's Support Team", type: "article" }
              ]
            },
            { id: "biz-april-2026-launch", label: "Trustpilot's April 2026 product launch", type: "article" }
          ]
        },
        {
          id: "biz-account-management",
          label: "Account management",
          type: "topic",
          children: [
            {
              id: "biz-set-up-account", label: "Set up your account", type: "subtopic",
              children: [
                { id: "biz-customize-business-profile", label: "Customize your business profile", type: "article" },
                { id: "biz-claim-business-profile", label: "Claim your business profile", type: "article" }
              ]
            },
            {
              id: "biz-manage-account", label: "Manage your account", type: "subtopic",
              children: [
                { id: "biz-manage-multiple-domains", label: "Manage multiple domains or businesses", type: "article" },
                { id: "biz-manage-review-notifications", label: "Manage review notifications", type: "article" },
                { id: "biz-manage-business-users", label: "Manage Trustpilot Business users", type: "article" },
                { id: "biz-roles-permissions-overview", label: "Roles and permissions overview", type: "article", keywords: ["roles", "permissions"] },
                { id: "biz-set-up-custom-roles", label: "Set up custom roles", type: "article" },
                { id: "biz-turn-off-auto-renewal", label: "Turn off auto-renewal for your Trustpilot Business plan", type: "article", keywords: ["auto-renewal"] }
              ]
            },
            {
              id: "biz-login-password", label: "Login and password", type: "subtopic", keywords: ["password"],
              children: [
                { id: "biz-change-account-email", label: "Change your Trustpilot Business account email", type: "article", keywords: ["email"] },
                { id: "biz-change-account-password", label: "Change your Trustpilot Business account password", type: "article", keywords: ["password", "reset password"] },
                { id: "biz-cant-access-account", label: "I can't access my Trustpilot Business account", type: "article" },
                { id: "biz-log-in-to-account", label: "Log in to your Trustpilot Business account", type: "article", keywords: ["login", "log in"] },
                { id: "biz-new-login-method-faq", label: "New login method to Trustpilot Business - FAQ", type: "article" }
              ]
            },
            {
              id: "biz-billing", label: "Billing", type: "subtopic",
              children: [
                { id: "biz-manage-billing-details", label: "Manage your billing details", type: "article" },
                { id: "biz-purchase-addons-upgrade", label: "Purchase add-ons or upgrade your plan", type: "article" },
                { id: "biz-set-up-automatic-billing", label: "Set up automatic billing", type: "article" },
                { id: "biz-pay-invoice", label: "How can I pay my Trustpilot invoice?", type: "article", keywords: ["invoice"] },
                { id: "biz-invoice-explained", label: "Your Trustpilot invoice explained", type: "article", keywords: ["invoice"] }
              ]
            },
            // Confirmed: no articles.
            { id: "biz-subscription-management", label: "Subscription Management", type: "subtopic", children: [] }
          ]
        },
        {
          id: "biz-get-reviews",
          label: "Get reviews",
          type: "topic",
          children: [
            {
              id: "biz-request-reviews-auto", label: "Request reviews automatically", type: "subtopic",
              children: [
                { id: "biz-automate-invitations-gtm", label: "Automate review invitations using Google Tag Manager", type: "article", keywords: ["gtm", "google tag manager"] },
                { id: "biz-embedded-review-form-link", label: "Embedded Review Form with Unique Link", type: "article" },
                { id: "biz-automatic-invitation-methods", label: "Trustpilot's automatic invitation methods", type: "article" }
              ]
            },
            {
              id: "biz-request-reviews-manual", label: "Request reviews manually", type: "subtopic",
              children: [
                { id: "biz-send-product-review-invitations-import", label: "Send product review invitations by importing a customer data file", type: "article" },
                { id: "biz-send-service-review-invitations-import", label: "Send service review invitations by importing a customer data file", type: "article" },
                { id: "biz-manual-invitation-methods", label: "Trustpilot's manual invitation methods", type: "article" },
                { id: "biz-manual-invitation-access-ends", label: "What to do when your manual invitation access ends", type: "article" }
              ]
            },
            {
              id: "biz-request-reviews-outside", label: "Request reviews using methods outside of Trustpilot's system", type: "subtopic",
              children: [
                { id: "biz-send-invitations-api-link", label: "Send invitations with a Business API link", type: "article", keywords: ["api"] },
                { id: "biz-troubleshoot-generated-links", label: "Troubleshoot Business Generated Links", type: "article" },
                { id: "biz-what-are-generated-links", label: "What are Business Generated Links?", type: "article" }
              ]
            },
            {
              id: "biz-manage-review-invitations", label: "Manage your review invitations", type: "subtopic",
              children: [
                { id: "biz-add-tp-to-spf-record", label: "Add Trustpilot to your SPF record", type: "article", keywords: ["spf"] },
                { id: "biz-configure-invitation-email-settings", label: "Configure your invitation email settings", type: "article" },
                { id: "biz-configure-invitation-time-delivery", label: "Configure your invitation time and delivery settings", type: "article" },
                { id: "biz-customize-invitation-template", label: "Customize your invitation template", type: "article" },
                { id: "biz-more-feedback-multiple-reviews", label: "Get more customer feedback with multiple reviews", type: "article" },
                { id: "biz-review-email-invitation-templates", label: "How we review your email invitation templates", type: "article" },
                { id: "biz-invitation-optimizer", label: "Invitation optimizer", type: "article" },
                { id: "biz-invitation-status-overview", label: "Invitation status overview", type: "article" },
                { id: "biz-manage-sent-invitations", label: "Manage your sent invitations", type: "article" },
                { id: "biz-turn-off-tracking-pixels", label: "Turn off tracking pixels in review invitations", type: "article", keywords: ["tracking pixels"] }
              ]
            },
            {
              id: "biz-guidelines-tips", label: "Guidelines + tips", type: "subtopic",
              children: [
                { id: "biz-collect-reviews-on-premises", label: "Collect reviews on business premises", type: "article" },
                { id: "biz-tips-for-businesses", label: "Tips for businesses", type: "article" }
              ]
            },
            { id: "biz-invitation-addon-module", label: "Invitation Add-on Module", type: "article" },
            { id: "biz-set-up-in-app-review-collector", label: "Set up an In-app review collector", type: "article" },
            { id: "biz-invitation-methods", label: "Trustpilot invitation methods", type: "article" }
          ]
        },
        {
          id: "biz-automatic-feedback-service",
          label: "Automatic Feedback Service",
          type: "topic",
          children: [
            {
              id: "biz-standard-afs-guides", label: "Standard AFS guides", type: "subtopic",
              children: [
                { id: "biz-afs-faq", label: "Automatic Feedback Service - FAQ", type: "article", keywords: ["afs faq"] },
                { id: "biz-afs-overview", label: "Automatic Feedback Service (AFS)", type: "article", keywords: ["afs"] },
                { id: "biz-afs-customer-journey", label: "Collect reviews throughout your customer journey with Automatic Feedback Service (AFS)", type: "article", keywords: ["afs"] },
                { id: "biz-afs-bcc-field", label: "Set up Automatic Feedback Service (AFS) using a BCC field", type: "article", keywords: ["afs", "bcc"] },
                { id: "biz-afs-separate-trigger-email", label: "Set up Automatic Feedback Service (AFS) using a separate trigger email", type: "article", keywords: ["afs"] },
                { id: "biz-what-is-afs", label: "What is Automatic Feedback Service?", type: "article", keywords: ["afs"] }
              ]
            },
            {
              id: "biz-ecommerce-afs-guides", label: "Ecommerce AFS guides", type: "subtopic",
              children: [
                { id: "biz-afs-shopify-flow", label: "Use Automatic Feedback Service with the Shopify Flow app", type: "article", keywords: ["afs", "shopify"] }
              ]
            }
          ]
        },
        {
          id: "biz-manage-reviews",
          label: "Manage Reviews",
          type: "topic",
          children: [
            {
              id: "biz-service-reviews", label: "Service reviews", type: "subtopic",
              children: [
                { id: "biz-get-started-service-reviews", label: "Get started with service reviews", type: "article" },
                { id: "biz-manage-service-reviews", label: "Manage your service reviews", type: "article" },
                { id: "biz-review-follow-up", label: "Review follow-up", type: "article" },
                { id: "biz-tag-service-reviews", label: "Tag your service reviews", type: "article", keywords: ["tags"] },
                { id: "biz-review-spotlight", label: "Trustpilot's Review spotlight", type: "article" }
              ]
            },
            {
              id: "biz-product-reviews", label: "Product reviews", type: "subtopic",
              children: [
                { id: "biz-import-third-party-product-reviews", label: "Import third-party product reviews to Trustpilot", type: "article" },
                { id: "biz-manage-product-catalog", label: "Manage your product catalog", type: "article" },
                { id: "biz-prepare-product-catalog-csv", label: "Prepare your product catalog CSV file", type: "article", keywords: ["csv"] },
                { id: "biz-product-review-pages-beta", label: "Product review pages (Beta)", type: "article" },
                { id: "biz-set-up-product-catalog", label: "Set up your product catalog", type: "article" }
              ]
            },
            {
              id: "biz-location-reviews", label: "Location reviews", type: "subtopic",
              children: [
                { id: "biz-get-started-location-reviews", label: "Get started with location reviews", type: "article" },
                { id: "biz-create-csv-for-locations", label: "How to create a CSV file for locations", type: "article", keywords: ["csv"] },
                { id: "biz-location-reviews-faq", label: "Location reviews - FAQ", type: "article" },
                { id: "biz-manage-business-locations", label: "Manage your business locations", type: "article" },
                { id: "biz-set-up-location-review-invitations", label: "Set up location review invitations", type: "article" }
              ]
            },
            {
              id: "biz-manage-your-reviews", label: "Manage your reviews", type: "subtopic",
              children: [
                { id: "biz-how-to-reply-to-reviews", label: "How to reply to reviews", type: "article" },
                { id: "biz-request-info-from-reviewers", label: "How to request information from reviewers", type: "article" }
              ]
            },
            { id: "biz-tips-replying-reviews", label: "Tips for replying to reviews", type: "article" },
            { id: "biz-ai-assisted-replies", label: "Use AI-assisted replies to respond to reviews", type: "article", keywords: ["ai replies"] }
          ]
        },
        {
          id: "biz-analytics",
          label: "Analytics",
          type: "topic",
          children: [
            {
              id: "biz-performance",
              label: "Performance",
              type: "subtopic",
              children: [
                { id: "biz-analytics-explorer", label: "Analytics explorer", type: "article" },
                { id: "biz-invitation-analytics", label: "Invitation analytics", type: "article" },
                { id: "biz-reply-analytics", label: "Reply analytics", type: "article" },
                { id: "biz-service-reviews-analytics", label: "Service reviews analytics", type: "article" }
              ]
            },
            {
              id: "biz-review-insights",
              label: "Review insights",
              type: "subtopic",
              children: [
                { id: "biz-ri-locations", label: "Trustpilot Analytics: Review Insights - Locations", type: "article", keywords: ["locations"] },
                { id: "biz-ri-spotlight-report", label: "Trustpilot Analytics: Review Insights - Spotlight report", type: "article", keywords: ["spotlight report"] },
                { id: "biz-ri-topics", label: "Trustpilot Analytics: Review Insights - Topics", type: "article", keywords: ["topics"] },
                { id: "biz-ri-trustscore-forecast", label: "Trustpilot Analytics: Review Insights - TrustScore forecast", type: "article", keywords: ["trustscore forecast"] }
              ]
            },
            {
              id: "biz-engagement",
              label: "Engagement",
              type: "subtopic",
              children: [
                { id: "biz-ai-search-analytics", label: "AI search analytics", type: "article" },
                { id: "biz-eng-organic-reach", label: "Trustpilot Analytics: Organic reach", type: "article", keywords: ["organic reach"] },
                { id: "biz-eng-profile-engagement", label: "Trustpilot Analytics: Profile engagement", type: "article", keywords: ["profile engagement"] },
                { id: "biz-eng-search-engagement", label: "Trustpilot Analytics: Search engagement", type: "article", keywords: ["search engagement"] },
                { id: "biz-eng-seo-reach", label: "Trustpilot Analytics: SEO reach", type: "article", keywords: ["seo reach"] },
                { id: "biz-eng-visitor-insights", label: "Trustpilot Analytics: Visitor insights", type: "article", keywords: ["visitor insights"] },
                { id: "biz-eng-widgets-engagement", label: "Trustpilot Analytics: Widgets engagement", type: "article", keywords: ["widgets engagement"] }
              ]
            },
            {
              id: "biz-market",
              label: "Market",
              type: "subtopic",
              children: [
                { id: "biz-market-insights", label: "Market insights", type: "article" },
                { id: "biz-market-peers", label: "Trustpilot Analytics: Market peers", type: "article", keywords: ["market peers"] },
                { id: "biz-market-topics", label: "Trustpilot Analytics: Market topics", type: "article", keywords: ["market topics"] },
                { id: "biz-market-trends", label: "Trustpilot Analytics: Market trends", type: "article", keywords: ["market trends"] },
                { id: "biz-market-my-competitors", label: "Trustpilot Analytics: My competitors", type: "article", keywords: ["my competitors", "competitors"] }
              ]
            },
            { id: "biz-custom-dashboards", label: "Custom dashboards", type: "article" }
          ]
        },
        {
          id: "biz-share-promote",
          label: "Share & Promote",
          type: "topic",
          children: [
            { id: "biz-create-trustpilot-asset", label: "Create a Trustpilot asset", type: "article" },
            { id: "biz-share-facebook-instagram", label: "Share your rating and reviews on Facebook and Instagram", type: "article", keywords: ["facebook", "instagram", "social media"] },
            { id: "biz-share-pinterest", label: "Share your rating and reviews on Pinterest", type: "article", keywords: ["pinterest", "social media"] },
            { id: "biz-style-guidelines-marketing-assets", label: "Style guidelines for Trustpilot's marketing assets", type: "article", keywords: ["style guidelines", "brand"] },
            { id: "biz-google-store-ratings", label: "Trustpilot and Google store ratings", type: "article", keywords: ["google", "store ratings"] },
            { id: "biz-ai-visibility-best-practices", label: "Trustpilot best practices for AI visibility", type: "article", keywords: ["ai visibility"] },
            { id: "biz-business-and-ai-faq", label: "Trustpilot Business and AI – FAQ", type: "article", keywords: ["ai faq"] },
            { id: "biz-marketing-assets", label: "Trustpilot's Marketing assets", type: "article", keywords: ["marketing assets"] }
          ]
        },
        {
          id: "biz-trustbox-widgets",
          label: "TrustBox Widgets",
          type: "topic",
          children: [
            {
              id: "biz-add-widget",
              label: "How to add a widget",
              type: "subtopic",
              children: [
                { id: "biz-widget-accessibility", label: "Accessibility for TrustBox widgets", type: "article", keywords: ["accessibility"] },
                { id: "biz-add-service-review-widget", label: "Add a service review TrustBox widget", type: "article", keywords: ["service review widget"] },
                { id: "biz-add-newsletter-widget", label: "Add a TrustBox Newsletter widget to your email campaigns", type: "article", keywords: ["newsletter widget", "email campaigns"] }
              ]
            },
            {
              id: "biz-widget-overview-faq",
              label: "Widget overview and FAQ",
              type: "subtopic",
              children: [
                { id: "biz-trustbox-widget-overview", label: "TrustBox widget overview", type: "article" },
                { id: "biz-where-to-place-widgets", label: "Where to place TrustBox widgets on your website", type: "article", keywords: ["placement"] }
              ]
            },
            { id: "biz-what-is-trustbox-widget", label: "What is a TrustBox widget?", type: "article" }
          ]
        },
        {
          id: "biz-integrations",
          label: "Integrations",
          type: "topic",
          children: [
            {
              id: "biz-integrations-ecommerce",
              label: "Ecommerce",
              type: "subtopic",
              children: [
                { id: "biz-opencart-integration", label: "Trustpilot's OpenCart 3.0 integration", type: "article", keywords: ["opencart"] },
                { id: "biz-prestashop-integration", label: "Trustpilot's PrestaShop integration", type: "article", keywords: ["prestashop"] },
                { id: "biz-shopify-app-integration", label: "Trustpilot's Shopify app", type: "article", keywords: ["shopify"] },
                { id: "biz-upgrade-shopify-app", label: "Upgrade to the new Trustpilot app for Shopify", type: "article", keywords: ["shopify"] }
              ]
            },
            {
              id: "biz-integrations-payment-crm",
              label: "Payment & CRM",
              type: "subtopic",
              children: [
                { id: "biz-upgrade-salesforce-113-114", label: "How to upgrade from Trustpilot's Salesforce integration 1.13 to 1.14", type: "article", keywords: ["salesforce"] },
                { id: "biz-salesforce-integration", label: "Trustpilot's Salesforce integration (1.14 and above)", type: "article", keywords: ["salesforce"] },
                { id: "biz-hubspot-integration", label: "Trustpilot's HubSpot integration", type: "article", keywords: ["hubspot"] }
              ]
            },
            {
              id: "biz-integrations-developer-tools",
              label: "Developer tools",
              type: "subtopic",
              children: [
                { id: "biz-custom-trustbox-via-api", label: "Create a custom TrustBox widget using Trustpilot APIs", type: "article", keywords: ["api", "custom widget"] },
                { id: "biz-send-invitations-via-api", label: "Send invitations using a Trustpilot API Invitation", type: "article", keywords: ["api", "invitations"] },
                { id: "biz-api-service-review-guidelines", label: "Trustpilot APIs - Service Review Integration Guidelines", type: "article", keywords: ["api", "service review"] }
              ]
            },
            {
              id: "biz-integrations-marketing",
              label: "Marketing",
              type: "subtopic",
              children: [
                { id: "biz-partner-built-integration-overview", label: "Partner-built integration overview", type: "article", keywords: ["partner-built"] },
                { id: "biz-klaviyo-integration", label: "Trustpilot's Klaviyo integration", type: "article", keywords: ["klaviyo"] },
                { id: "biz-mailchimp-integration", label: "Trustpilot's Mailchimp integration", type: "article", keywords: ["mailchimp"] },
                { id: "biz-google-tag-manager-integration", label: "Trustpilot's Google Tag Manager integration", type: "article", keywords: ["google tag manager", "gtm"] },
                { id: "biz-hootsuite-integration", label: "Trustpilot's Hootsuite integration", type: "article", keywords: ["hootsuite"] }
              ]
            },
            {
              id: "biz-integrations-customer-support",
              label: "Customer support",
              type: "subtopic",
              children: [
                { id: "biz-slack-integration", label: "Trustpilot's Slack integration", type: "article", keywords: ["slack"] },
                { id: "biz-zendesk-integration", label: "Trustpilot's Zendesk integration", type: "article", keywords: ["zendesk"] }
              ]
            },
            { id: "biz-integration-overview", label: "Trustpilot's integration overview", type: "article" }
          ]
        }
      ]
    }
  ]
};
