# Get bun image and set workdir.
FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Install dependencies into temp directory.
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with production flag.
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node modules from temp to workdir.
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Copy production dependencies and source into final image.
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/utils utils
COPY --from=prerelease /usr/src/app/commands commands
COPY --from=prerelease /usr/src/app/package.json .

# Run the application
USER bun
ENTRYPOINT ["bun", "run", "index.ts"]