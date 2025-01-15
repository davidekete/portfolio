"use client";

import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import ContributionStyles from "./contributions.module.css";

const API_ENDPOINT = "https://api.github.com/graphql";

export default function GitHubContribution({ userName }: { userName: string }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const query = `
          query($userName: String!) { 
            user(login: $userName) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        const variables = { userName };

        const client = new GraphQLClient(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
          },
        });

        const result = await client.request(query, variables);
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchContributions();
  }, [userName]);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data.user.contributionsCollection.contributionCalendar);
  return (
    <div>
      <div className={ContributionStyles.contribution_grid}>
        {data.user.contributionsCollection.contributionCalendar.weeks.map(
          (weekData, weekIndex) => {
            return weekData.contributionDays.map((dayData, dayIndex) => {
              const numOfContributions = dayData.contributionCount;
              let contributionLevel;
              switch (true) {
                case numOfContributions === 0:
                  contributionLevel = "NONE";
                  break;
                case numOfContributions > 0 && numOfContributions < 3:
                  contributionLevel = "one";
                  break;
                case numOfContributions >= 3 && numOfContributions < 5:
                  contributionLevel = "two";
                  break;
                case numOfContributions >= 5 && numOfContributions < 7:
                  contributionLevel = "three";
                  break;
                case numOfContributions > 7:
                  contributionLevel = "four";
                  break;
                default:
                  contributionLevel = "NONE"; // Default case if no condition matches
              }

              return (
                <div
                  key={`${weekIndex}-${dayIndex}`} // Use unique keys based on week and day
                  title={dayData.date}
                  className={`${ContributionStyles.cell} ${
                    ContributionStyles[`level-${contributionLevel}`]
                  }`}
                ></div>
              );
            });
          }
        )}
      </div>
    </div>
  );
}
