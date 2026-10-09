import json, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

sources = [
 ('kathimerini','https://www.kathimerini.gr/infeeds/rss/nx-rss-feed.xml'),
 ('naftemporiki','https://www.naftemporiki.gr/feed/'),
 ('ert','https://www.ertnews.gr/feed/')]
target = Path('dist/feed-snapshot.json')
state = json.loads(target.read_text(encoding='utf-8')) if target.exists() else {'feeds':[]}
state['feeds'] = [f for f in state['feeds'] if f['id'] in dict(sources)]
success = 0
for source_id, url in sources:
 try:
  request = urllib.request.Request(url,headers={'User-Agent':'GNN RSS Reader/1.0'})
  with urllib.request.urlopen(request, timeout=25) as response:
   raw = response.read()
  try:
   root = ET.fromstring(raw)
   entries = root.findall('./channel/item')
  except ET.ParseError:
   # Some publishers send a truncated final item. Accept only complete XML items.
   import re
   complete = re.findall(r'<item\b[^>]*>.*?</item>', raw.decode('utf-8'), re.S)
   wrapper = '<channel xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/">' + ''.join(complete) + '</channel>'
   entries = ET.fromstring(wrapper).findall('item')
  items = []
  for item in entries[:10]:
   image = item.find('{http://search.yahoo.com/mrss/}thumbnail')
   enclosure = item.find('enclosure')
   thumbnail = image.get('url','') if image is not None else ''
   if not thumbnail and enclosure is not None and enclosure.get('type','').startswith('image/'):
    thumbnail = enclosure.get('url','')
   if not thumbnail:
    import re
    match = re.search(r'<img[^>]+src=[\"\x27]([^\"\x27]+)', item.findtext('description',''))
    thumbnail = match.group(1) if match else ''
   published = None
   try: published = parsedate_to_datetime(item.findtext('pubDate','')).astimezone(timezone.utc).isoformat()
   except (TypeError,ValueError): pass
   items.append({'title':item.findtext('title',''),'url':item.findtext('link',''),'publishedAt':published,'thumbnail':thumbnail})
  if not items: raise ValueError('empty feed')
  now = datetime.now(timezone.utc).isoformat()
  state['feeds'] = [f for f in state['feeds'] if f['id'] != source_id] + [{'id':source_id,'items':items,'checkedAt':now}]
  success += 1
 except Exception as error:
  print(source_id + ': retained previous data: ' + str(error))
if not success or len(state['feeds']) != len(sources):
 raise RuntimeError('Feed snapshot incomplete; existing file preserved')
state['savedAt'] = datetime.now(timezone.utc).isoformat()
target.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
print('Updated sources:',success)
