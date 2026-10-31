"""Serve copied docs with the extensionless URLs used by their navigation."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, urlunsplit


class DocsHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        url = urlsplit(self.path)
        requested = Path(self.translate_path(url.path))
        if not requested.exists() and not Path(unquote(url.path)).suffix:
            html = requested.with_suffix('.html')
            if html.is_file():
                self.path = urlunsplit(('', '', url.path.rstrip('/') + '.html', url.query, ''))
        return super().send_head()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--directory', default=str(Path(__file__).parent / 'dist-build'))
    parser.add_argument('--port', type=int, default=4350)
    args = parser.parse_args()
    handler = partial(DocsHandler, directory=args.directory)
    ThreadingHTTPServer(('127.0.0.1', args.port), handler).serve_forever()
