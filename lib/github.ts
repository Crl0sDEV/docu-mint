import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

interface GitHubContentResponse {
  content: string;
  encoding: string;
}

interface TreeItem {
  path: string;
  type: string;
}

// Interface para sa response ng GitHub Git Tree API
interface GitHubTreeResponse {
  tree: TreeItem[];
  truncated: boolean;
}

export async function fetchRepoData(url: string) {
  try {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const path = cleanUrl.replace("https://github.com/", "").split("/");
    const owner = path[0];
    const repo = path[1];

    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/package.json', {
      owner,
      repo,
    });

    const data = response.data as GitHubContentResponse;
    const content = Buffer.from(data.content, 'base64').toString();
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function fetchRepoStructure(url: string): Promise<string> {
  try {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const path = cleanUrl.replace("https://github.com/", "").split("/");
    const owner = path[0];
    const repo = path[1];

    const response = await octokit.request('GET /repos/{owner}/{repo}/git/trees/main?recursive=1', {
      owner,
      repo,
    });

    // Explicitly cast the response data
    const data = response.data as GitHubTreeResponse;
    const tree = data.tree;
    
    // Explicitly define the type of 'structure' as string
    const structure: string = tree
      .slice(0, 50) 
      .map((item: TreeItem) => item.path)
      .join("\n");

    return structure;
  } catch (error) {
    const err = error as Error;
    console.error("Structure Error:", err.message);
    return "Not available";
  }
}