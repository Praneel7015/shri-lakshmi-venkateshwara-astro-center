# Set up your own website on Windows

This guide is for the person taking over the website. It creates **your own** GitHub fork, Vercel website and Sanity content project. Your changes will not change the original owner's site.

You need a Windows computer, an email address, a GitHub account and a Vercel account. You will also create a Sanity account. Keep this page open as you work. Dashboard labels can change; follow the linked official guides if the screens look different.

> **Current site status:** This repository is a branded preview, not a finished launch. Some contact and booking actions, testimonials, biographies and search indexing are intentionally suppressed in the current code. Adding details in Studio alone may not make them visible. A developer must review the preview overrides and launch checklist in [PREVIEW_REVIEW.md](PREVIEW_REVIEW.md) before launch.

## Start here: find your place

You do not need to finish everything in one sitting. After each step, use the result below to decide where to continue:

1. **No copy of the repository in your GitHub account yet?** Start at step 1.
2. **Vercel deployment failed?** Open the failed deployment, then follow [If the Vercel install fails](#if-the-vercel-install-fails). Send the first error lines to the developer if you need help.
3. **Vercel says Ready but you have no Sanity project?** Continue at step 2. Example content may be shown at this stage.
4. **Sanity project exists but Studio is not connected?** Check steps 2 and 3, then redeploy as described in step 6.
5. **Studio works but you need to add content?** Follow steps 4?6. Step 5 is only for a new, empty Sanity dataset.
6. **Content is saved but the website has not changed?** Redeploy manually in Vercel or set up the automatic rebuild in step 7.

You will need access to the GitHub fork, its Vercel project and the Sanity project. Keep your project ID and website address handy; never send your Sanity token in a message or screenshot. Each numbered section below tells you what to do next.

## 1. Fork the repository and deploy it

1. Sign in to GitHub and open the original repository. If it is private, its owner must give you access and allow forking first.
2. Click **Fork**, choose your account and create the fork. If GitHub does not offer that option, ask the owner about access and the repository's forking settings.
3. Sign in to [Vercel](https://vercel.com/) with the GitHub account that owns your fork. Select **Add New → Project**, import **your fork**, and deploy it. Allow Vercel access to the fork if asked.
4. Copy the production website address from Vercel, for example `https://my-centre.vercel.app`. Use your own address wherever this guide says `YOUR_SITE_URL`. The first deployment may show example content; Studio is not connected until the steps below are complete.

## Two different Sanity values

Sanity gives you a **Project ID** and an **Editor token**. They have different purposes:

| Value | Where to find it | Where to paste it |
| --- | --- | --- |
| Project ID | Sanity Manage ? select your project ? project overview. It is a short ID, not a URL or token. | In Vercel, as `NEXT_PUBLIC_SANITY_PROJECT_ID`; also in the PowerShell Project ID line in step 5. |
| Editor token | Sanity Manage ? your project ? API ? Tokens. This is a long secret, created for the one-time import. | Only in the `SANITY_WRITE_TOKEN` PowerShell line in step 5. **Never paste it into a Vercel `NEXT_PUBLIC_` variable or the Project ID field.** |

Do not copy the example placeholders themselves. Replace them with your own values. Keep the token private and revoke it after the import.

## 2. Create your own Sanity project

1. Sign in at [Sanity Manage](https://www.sanity.io/manage) using the account that should own the content. Create a project and a **public** dataset called `production`. The public dataset is needed because this site reads published content at build time without a read token. Do not put confidential information in it.
2. On the project overview, find and copy its **Project ID**. It is a short ID, not the project name. Keep it handy as `YOUR_PROJECT_ID`.
3. In project settings, find **API → CORS origins**. Add your exact production origin, for example `https://my-centre.vercel.app`, and enable **Allow credentials**. Add `http://localhost:3333` too if you plan to run Studio locally. Do not include `/studio/` or a trailing path in an origin. Add your custom domain separately if you use one. See [Sanity's CORS guide](https://www.sanity.io/docs/content-lake/cors).
4. In the project API settings, create a token with **Editor** access for the one-time import. Copy it into a safe place temporarily. It is a password: do not commit it to Git, put it in a `NEXT_PUBLIC_` variable, or share it publicly. An Administrator may be needed for these settings.

## 3. Connect Vercel

1. Open your project in Vercel, then **Settings → Environment Variables**.
2. Add each of these for **Production** (and Preview if you need preview deployments):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | The **short Project ID** from the Sanity project overview, not the Editor token or a URL |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SITE_URL` | Your production address, e.g. `https://my-centre.vercel.app`, without a trailing slash |

3. Save the variables. Do **not** add the editor token to these public variables. Environment-variable changes apply to the next build, not the existing one; you will redeploy after importing content. See [Vercel environment variables](https://vercel.com/docs/environment-variables).

After the preview contact restrictions are removed and the site is ready for launch, the enquiry form can use the WhatsApp number in Site settings. Alternatively, configure `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel with your own Web3Forms access key; otherwise it uses WhatsApp when a number is present. Test delivery before relying on the form.

## 4. Install the tools on Windows

1. Install a current **Node.js 24 LTS** release from [nodejs.org](https://nodejs.org/). Install [Git for Windows](https://git-scm.com/install/windows) if it is not already installed. Close and reopen PowerShell after installing.
2. Open **Windows PowerShell**. Check both commands; each should print a version:

   ```powershell
   node --version
   git --version
   npm.cmd --version
   ```

3. On your GitHub fork, click **Code → HTTPS** and copy the URL. In PowerShell, move to the folder where you want the project, then clone your own URL (replace the example):

   ```powershell
   cd $env:USERPROFILE\Documents
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   npm.cmd run setup
   ```

   `setup` installs the locked dependencies for both the website and Studio. Wait until it finishes. Every later command in this guide runs from this project folder. If a command fails, read the error rather than continuing. If `npm.cmd --version` fails after installing Node, repair or reinstall Node.js and reopen PowerShell; an old or damaged global npm installation can interfere with the bundled npm.

## If the Vercel install fails

The repository contains two separate applications: the website at the root and Sanity Studio in `studio/`. Each has its own `package.json` and committed `package-lock.json`. Vercel installs them in order using `npm ci && npm ci --prefix studio`; both must be present in the deployed branch. Do not remove either lockfile or combine the manifests as a first troubleshooting step.

In Vercel, open your project, click **Deployments**, select the deployment marked **Error**, and expand **Build Logs**. Scroll upward to the first red npm error. Copy the **first error lines above** the npm usage/help text and the command immediately preceding them. The final ?exited with 1? line alone does not identify the cause. Check that Vercel is building the intended fork and commit, Root Directory is the repository root, both lockfiles are present in that commit, and Node.js is set to 24. On Windows, from the repository root, the two install steps can be run individually to identify the failing one:

```powershell
npm.cmd ci
npm.cmd ci --prefix studio
```

If npm reports that a manifest and lockfile are out of sync, update the appropriate lockfile in a development checkout using the same Node/npm version, review and commit it, then redeploy. Do not copy tokens or environment variable values into shared logs. If the error persists, send the developer the first error lines, the failed command, Node/npm versions and the deployed commit. You can use this message: ?My Vercel deployment failed. The first error says [paste error]. The command was [paste command]. The commit is [copy it from the deployment page].?

## If the build says `ENOTFOUND` for `api.sanity.io`

Check Vercel ? your project ? **Settings ? Environment Variables** ? `NEXT_PUBLIC_SANITY_PROJECT_ID`. The value must be the short Project ID from the Sanity project overview. If you pasted the long Editor token or a full URL there, replace it with the Project ID, save, then open **Deployments** and **Redeploy**. Environment variable changes only take effect in a new build. If a token appeared in a build log or was exposed, revoke it in Sanity Manage ? API ? Tokens and create a replacement if needed. Do not share the token when asking for help.

## 5. Add starter content to the new Sanity project

**Run this only against your new, empty project.** The seed script creates or replaces documents with fixed IDs; running it again can overwrite edits. For an existing project, export a backup first and use a deliberate import instead. Starter content is example content: review it before publishing the site.

In the same PowerShell window, enter the values from step 2. Put the **short Project ID** in the first line and the **long Editor token** only in the third line. Replace the placeholder text inside quotes; keep the quotes. These variables last only for this PowerShell session:

```powershell
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = 'YOUR_PROJECT_ID'
$env:NEXT_PUBLIC_SANITY_DATASET = 'production'
$env:SANITY_WRITE_TOKEN = 'YOUR_EDITOR_TOKEN'
npm.cmd run seed
Remove-Item Env:SANITY_WRITE_TOKEN
```

The script reports how many documents it prepared and whether the import succeeded. If it says the ID or token is missing, check the variables and token permissions and retry only after checking what was imported. Never paste a real token into a GitHub issue or commit. Revoke the temporary token in Sanity Manage once it is no longer needed.

The seed contains the sample content from the version of the repository you forked; it does **not** fetch later edits from the original Sanity project. To transfer the original project's current content, ask its owner for a Sanity dataset export and follow [Sanity's dataset import instructions](https://www.sanity.io/docs/cli-reference/cli-datasets) instead. Import into your own project, and review media and credentials. Do not import both blindly over an existing dataset.

## 6. Rebuild, open Studio and enter your details

1. In Vercel, go to **Deployments**, open the latest production deployment's menu and choose **Redeploy**. Wait for **Ready**. This rebuild includes the variables and imported content.
2. Visit `YOUR_SITE_URL/studio/` and sign in with the Sanity account that owns the new project. If Studio reports a CORS error, check step 2 and redeploy after correcting any variables. A preview deployment may require its own allowed origin.
3. In Studio, open **Site settings → Business details**. Enter the business name, phone, WhatsApp number, email, address and opening hours. WhatsApp must contain digits with country code, for example `919876543210`, without `+`, spaces or punctuation. These are separate fields: set both phone and WhatsApp if both are used. Replace example information; do not use the example numbers.
4. Click **Publish**. Site settings hold the intended business details, but the current preview suppresses some contact information and actions until the launch changes described above are made. Contact details manually typed into an article, image or other free-text field are separate and must be edited there too. The site is statically built, so a change appears on the public site only after the next successful rebuild (step 7).
5. Add the centre's own images under **Home page → Hero slides**. The homepage carousel appears when at least one slide has an image. Add approved reviews under **Testimonials**, then select the reviews to feature on the Home page. Edit articles under **Blog posts**, questions under **FAQs**, and other content in their corresponding Studio sections. The centre's images, real contact details and approved reviews are not created automatically.

Some interface labels and page wording are still built into the code; not every piece of text is currently editable in Studio. See `docs/CONTENT_GUIDE.md` for the content fields already available. Do not promise editors that every label is editable without a developer.

## 7. Make published changes appear automatically

The website is a static export: clicking Publish saves to Sanity but does not itself update the built website. For Vercel, configure a deploy hook for the **production branch of your fork**, then configure a Sanity webhook to POST to that hook on published document create, update and delete events. Exclude drafts (for example, with the filter `!(_id in path("drafts.**"))`). Keep the deploy-hook URL private: anyone holding it can trigger a build. Confirm the branch is the branch Vercel uses for production, usually `main`.

1. In Vercel project **Settings → Git → Deploy Hooks**, create a hook for the production branch and copy its URL. See [Vercel deploy hooks](https://vercel.com/docs/deployments/deploy-hooks).
2. In Sanity Manage, open your project → **API → Webhooks**, create a webhook for the `production` dataset, paste the Vercel hook URL, choose **POST**, and select create, update and delete. Set the draft-excluding filter above. Save it. See [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks).
3. Change one harmless piece of text in Studio and press **Publish**. Watch **Vercel → Deployments** for a new production build; wait for **Ready**, then refresh the public page. If it does not start, check Sanity's webhook delivery logs, the filter, the hook URL and Vercel's deployment logs. A manual Vercel redeploy is a fallback.

The GitHub Actions webhook described in the main README publishes a separate `deploy` branch for traditional hosting; it does not by itself trigger a Vercel production rebuild. Scheduled posts also require a rebuild after their publication time.

## 8. Check before handing over

- Visit the homepage, contact page, blog and `/studio/` on the actual domain. Check English and Kannada and check on a phone.
- Publish a test change to the phone, WhatsApp and address, wait for the build, and verify the header, footer, contact page and links. Put in the final values and publish again.
- Test an enquiry using the chosen form destination. Check the email inbox or WhatsApp recipient receives it. If no destination is configured the form is disabled.
- Replace example content and images; have the centre review articles and confirm permissions for testimonials.
- Invite each editor to the Sanity project with the appropriate role. Arrange backups and keep project ownership, Vercel access and domain access with the client.

## Hosting elsewhere

For a server such as GoDaddy cPanel, the project can produce the static `out/` directory using `npm.cmd run build` after installing both sets of dependencies and setting the Sanity variables. The server needs the routing rules described in the main README; Apache can use the included `.htaccess`. The GitHub Actions workflow can publish that output to a `deploy` branch, but its secrets, webhook and server update steps must be configured in **your fork**. A Vercel deploy hook does not update a GoDaddy server.
