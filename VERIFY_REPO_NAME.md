# Verify Repository Name - GitHub Push Issue

## Issue

The push is failing with "Repository not found" error. This usually means the repository name in the URL doesn't match exactly what's on GitHub.

## Solution: Verify Exact Repository Name

### Step 1: Check Your Repository URL

1. Go to your GitHub repository
2. Click the green "Code" button
3. Copy the HTTPS URL
4. It should look like one of these:
   - `https://github.com/shedokedev1558-bit/Global-Travel-advisory.git`
   - `https://github.com/shedokedev1558-bit/global-travel-advisory.git`
   - `https://github.com/shedokedev1558-bit/global-Travel-advisory.git`

### Step 2: Update Remote with Correct URL

Replace `YOUR_EXACT_URL` with the URL from Step 1 (use your actual token):

```powershell
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_EXACT_REPO_NAME.git
```

### Step 3: Verify Remote

```powershell
git remote -v
```

You should see your updated URL.

### Step 4: Push

```powershell
git push -u origin main
```

## Common Repository Names

Try these in order:

### Option 1: All Lowercase
```powershell
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/global-travel-advisory.git
git push -u origin main
```

### Option 2: Capital G, lowercase rest
```powershell
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/Global-travel-advisory.git
git push -u origin main
```

### Option 3: Capital G and T
```powershell
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/Global-Travel-advisory.git
git push -u origin main
```

### Option 4: All Capitals
```powershell
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/GLOBAL-TRAVEL-ADVISORY.git
git push -u origin main
```

## Quick Check

To see what repository name GitHub created, visit:
https://github.com/shedokedev1558-bit

Look at the URL in your browser's address bar when viewing your repository. That's the exact name to use.

## After Successful Push

You should see:
```
Enumerating objects: ...
Counting objects: ...
Compressing objects: ...
Writing objects: ...
...
To https://github.com/shedokedev1558-bit/[your-repo-name].git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Still Not Working?

1. Verify the repository exists at: https://github.com/shedokedev1558-bit
2. Check the token is valid: https://github.com/settings/tokens
3. Try creating a new token if the current one is expired
4. Wait a few minutes for GitHub to fully initialize the repository

---

**Next Step**: Verify the exact repository name and update the remote URL accordingly.
