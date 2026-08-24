'use client'

import { WriteupShell, Step, Terminal, FlagReveal, MindsetQuote } from '@/components/WriteupShell'

export default function SleuthkitApprenticeWriteup() {
  return (
    <WriteupShell
      title="Sleuthkit Apprentice"
      category="Forensics"
      categoryHref="/ctf/forensics"
      difficulty="Medium"
      source="picoCTF"
    >
      <h2>Challenge Overview</h2>
      <div className="not-prose grid gap-3 mb-6">
        <div>
          <div className="text-gray-400 text-sm">Name</div>
          <div className="font-medium">Sleuthkit Apprentice</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Description</div>
          <p className="mt-1 text-gray-200">
            Download this disk image and find the flag. A compressed disk image,{' '}
            <code className="bg-white/5 px-1 py-0.5 rounded text-xs">disk.flag.img.gz</code>, is
            provided - no further hints given. Pure filesystem forensics using The Sleuth Kit (TSK).
          </p>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Tools Used</div>
          <ul className="list-disc list-inside mt-1 text-gray-200 text-sm space-y-0.5">
            <li><code className="bg-white/5 px-1 rounded text-xs">gunzip</code> - decompress the archive</li>
            <li><code className="bg-white/5 px-1 rounded text-xs">file</code>, <code className="bg-white/5 px-1 rounded text-xs">exiftool</code> - initial file identification</li>
            <li><code className="bg-white/5 px-1 rounded text-xs">fdisk</code> - partition table enumeration</li>
            <li>The Sleuth Kit: <code className="bg-white/5 px-1 rounded text-xs">fls</code>, <code className="bg-white/5 px-1 rounded text-xs">icat</code>, <code className="bg-white/5 px-1 rounded text-xs">istat</code></li>
          </ul>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Hints</div>
          <ul className="list-disc list-inside mt-1">
            <li>[None given]</li>
          </ul>
        </div>
      </div>

      <Step n={1} label="Unpack and Identify the Image" />
      <p className="text-gray-300 text-sm leading-relaxed">
        Decompress the archive and check what we are working with:
      </p>
      <Terminal lines={[
        '$ gunzip disk.flag.img.gz',
        '$ file disk.flag.img',
        'disk.flag.img: DOS/MBR boot sector; partition 1 : ID=0x83, active, start-CHS (0x0,32,33),',
        '  end-CHS (0x6,223,19), startsector 2048, 204800 sectors; ...',
      ]} />
      <p className="text-gray-300 text-sm leading-relaxed">
        <code className="bg-white/5 px-1 py-0.5 rounded text-xs">file</code> confirms a DOS/MBR disk image with a partition table.{' '}
        <code className="bg-white/5 px-1 py-0.5 rounded text-xs">exiftool</code> was also tried but returned nothing
        useful - it targets file metadata, not raw disk images. Dead end by design.
      </p>

      <Step n={2} label="Read the Partition Table" />
      <Terminal lines={[
        '$ fdisk -l disk.flag.img',
        '',
        'Device          Boot   Start    End    Sectors  Size  Id  Type',
        'disk.flag.img1  *       2048   206847   204800  100M  83  Linux',
        'disk.flag.img2        206848   360447   153600   75M  82  Linux swap / Solaris',
        'disk.flag.img3        360448   614399   253952  124M  83  Linux',
      ]} />
      <div className="not-prose overflow-x-auto mt-3 mb-4">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="py-2 pr-6">#</th>
              <th className="py-2 pr-6">Start Sector</th>
              <th className="py-2 pr-6">Size</th>
              <th className="py-2 pr-6">Type</th>
              <th className="py-2">Likely Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/5">
              <td className="py-1.5 pr-6 font-mono">1</td>
              <td className="py-1.5 pr-6 font-mono">2048</td>
              <td className="py-1.5 pr-6">100 MB</td>
              <td className="py-1.5 pr-6">Linux (0x83)</td>
              <td className="py-1.5">/boot</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 pr-6 font-mono">2</td>
              <td className="py-1.5 pr-6 font-mono">206848</td>
              <td className="py-1.5 pr-6">75 MB</td>
              <td className="py-1.5 pr-6">Linux swap (0x82)</td>
              <td className="py-1.5">Swap</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-6 font-mono">3</td>
              <td className="py-1.5 pr-6 font-mono">360448</td>
              <td className="py-1.5 pr-6">124 MB</td>
              <td className="py-1.5 pr-6">Linux (0x83)</td>
              <td className="py-1.5">Root filesystem</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        The <strong>Start</strong> column is exactly what TSK&apos;s{' '}
        <code className="bg-white/5 px-1 py-0.5 rounded text-xs">-o</code> flag expects - it
        multiplies internally by the sector size (512 bytes), so no manual byte-offset math is needed.
      </p>

      <Step n={3} label="Enumerate Partition 1 - Boot" />
      <Terminal lines={[
        '$ fls -o 2048 -r -p disk.flag.img',
        '',
        '... (standard Alpine boot files: syslinux, vmlinuz, initramfs, System.map)',
        'V/V 25585: $OrphanFiles',
      ]} />
      <p className="text-gray-300 text-sm leading-relaxed">
        Only stock Alpine boot files appeared.{' '}
        <code className="bg-white/5 px-1 py-0.5 rounded text-xs">$OrphanFiles</code> is a TSK-synthesised
        virtual entry - confirmed as invalid below.
      </p>
      <Terminal lines={[
        '$ icat -o 2048 disk.flag.img 25585   # empty output',
        '$ istat -o 2048 disk.flag.img 25585',
        'Invalid metadata address (ext2fs_dinode_load: address: 25585)',
      ]} />
      <p className="text-gray-300 text-sm leading-relaxed">
        Confirmed as a genuine invalid inode reference - ruled out. Partition 2 (swap) was also skipped;
        swap has no persistent filesystem structure for <code className="bg-white/5 px-1 py-0.5 rounded text-xs">fls</code> to enumerate.
      </p>

      <Step n={4} label="Enumerate Partition 3 - Root Filesystem" />
      <Terminal lines={[
        '$ fls -o 360448 -r -p disk.flag.img',
        '',
        '... (full Alpine root: /etc, /lib, /usr, /var, /root ...)',
        '',
        'r/r * 2082(realloc):   root/my_folder/flag.txt',
        'r/r 2371:              root/my_folder/flag.uni.txt',
      ]} />
      <p className="text-gray-300 text-sm leading-relaxed">
        Two entries stand out under <code className="bg-white/5 px-1 py-0.5 rounded text-xs">/root/my_folder/</code>:
      </p>
      <div className="not-prose mt-2 p-4 rounded-lg bg-yellow-400/5 border border-yellow-400/20 text-sm text-yellow-200 leading-relaxed">
        <strong className="text-yellow-400">⚠️ The (realloc) Trap</strong>
        <p className="mt-2">
          <code className="bg-black/30 px-1 rounded text-xs">flag.txt</code> is marked{' '}
          <code className="bg-black/30 px-1 rounded text-xs">* 2082(realloc)</code>. In TSK notation,
          the directory entry still points to inode 2082, but that inode has since been reallocated to
          a <em>different</em> file. Cross-referencing confirms:
        </p>
        <Terminal lines={[
          'r/r 2082:              var/lib/chrony/chrony.drift        ← live owner',
          'r/r * 2082(realloc):   var/lib/chrony/chrony.drift.tmp    ← stale',
          'r/r * 2082(realloc):   root/my_folder/flag.txt            ← stale',
        ]} />
        <p className="mt-1">
          Extracting inode 2082 would return chrony drift data - a false negative that looks like a real attempt.
        </p>
        <p className="mt-2">
          <code className="bg-black/30 px-1 rounded text-xs">flag.uni.txt</code> at inode{' '}
          <strong>2371</strong> carries no <code className="bg-black/30 px-1 rounded text-xs">*</code>{' '}
          and no <code className="bg-black/30 px-1 rounded text-xs">(realloc)</code> tag - it is the
          current, live allocation.
        </p>
      </div>

      <Step n={5} label="Extract the Flag" />
      <p className="text-gray-300 text-sm leading-relaxed">
        Target inode 2371 on partition 3 (start sector 360448):
      </p>
      <Terminal lines={[
        '$ icat -o 360448 disk.flag.img 2371',
        '',
        'picoCTF{by73_5urf3r_2f22df38}',
      ]} />

      <div className="mt-8" />
      <FlagReveal flag="picoCTF{by73_5urf3r_2f22df38}" label="Flag" />

      <h3 className="mt-8">Key Takeaways</h3>
      <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
        <li>
          <strong className="text-gray-100">Inode reallocation is a silent pitfall.</strong>{' '}
          Always check TSK&apos;s <code className="bg-white/5 px-1 rounded text-xs">*</code> and{' '}
          <code className="bg-white/5 px-1 rounded text-xs">(realloc)</code> markers before extracting.
        </li>
        <li>
          <strong className="text-gray-100">The <code className="bg-white/5 px-1 rounded text-xs">-o</code> flag takes sectors, not bytes.</strong>{' '}
          Use <code className="bg-white/5 px-1 rounded text-xs">fdisk -l</code>&apos;s Start column directly.
        </li>
        <li>
          <strong className="text-gray-100">Orphan nodes aren&apos;t always interesting.</strong>{' '}
          Validate them with <code className="bg-white/5 px-1 rounded text-xs">istat</code> before pursuing.
        </li>
        <li>
          <strong className="text-gray-100">Swap partitions rarely yield persistent data</strong>{' '}
          without explicit carving.
        </li>
      </ul>

      <MindsetQuote
        label="HACKER'S MINDSET"
        quote="Not every inode that looks like a flag is one. Read the metadata - then trust the data."
      />
    </WriteupShell>
  )
}
